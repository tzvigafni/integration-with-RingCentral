const bodyParser = require('body-parser');

const env = require('dotenv').config();

const express = require('express');
const app = express();

const fs = require('fs');

const SDK = require('@ringcentral/sdk').SDK;
const { Subscriptions } = require('@ringcentral/subscriptions');
app.set('trust proxy', 1);
const session = require('express-session');
const proxy = require('express-http-proxy');

const cors = require('cors');
const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"))
// app.set('view engine', 'ejs');
// app.get('/:businessId', (req, res) => {
// res.render('index', {businessId: req.params.businessId});
// });
app.use(session({
    secret: 'khgt76rb65b765rtf9fd',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))

const rcsdk = new SDK({
    server: SDK.server.sandbox,
    clientId: process.env.RC_CLIENT_ID,
    clientSecret: process.env.RC_CLIENT_SECRET,
    redirectUri: `${process.env.SERVER_URL}/auth/callback`
});


// app.get("/userinfo",(req, res) =>{
//     console.log("userInfo");
//     res.send(req.session)
// });

// app.get("/setuserid",(req,res)=>{
//     req.session.user_id=req.query.user_id;
//     res.send("ok")
// })

var platform = rcsdk.platform();

app.get("/authenticate", (req, res) => {

    let businessId = req.query.businessId
    console.log('businessId', businessId);

    let url = rcsdk.loginUrl({
        redirectUri: `${process.env.SERVER_URL}/auth/callback`,
        state: businessId
    });
    console.log("url=>", url);

    res.redirect(url + `&businessId=${businessId}`);
});




app.get("/auth/callback", async (req, res) => {
    console.log("callback get called", req.query)

    // var loginOptions = rcsdk.parseLoginRedirect("?code=" + req.query.code);
    var resp = await platform.login({
        code: req.query.code,
        redirectUri: process.env.SERVER_URL
    })
        .then(async resp => {
            console.log("login success")
            let datatosave = await resp.json();
            datatosave.phonedo_business_id = req.query.state;
            const filePath = 'tokens.json';

            let jsonData = [];
            if (fs.existsSync(filePath)) {
                const fileContent = fs.readFileSync(filePath, 'utf-8');
                if (fileContent) {
                    jsonData = JSON.parse(fileContent);
                }
            }
            const newParameter = {
                datatosave
            };
            jsonData.push(newParameter);
            const updatedData = JSON.stringify(jsonData, null, 2);
            fs.writeFileSync(filePath, updatedData, 'utf-8');
            console.log('Updated token!');

            req.session.user_information = datatosave;
            res.send(datatosave);

        }).catch(e => {
            console.log("login error", e)
            res.sendStatus(400);
        })
    // save the token in array in a json file
})


app.get("/getphonenumbers", (req, res) => {
    platform.get(`/restapi/v1.0/account/~/extension`)
        .then(async (r) => {
            console.log("response ... ");
            res.send(await r.json());
        }).catch((e) => {
            console.log("extensions err", e)
        });
});


const subscriptions = new Subscriptions({
    sdk: rcsdk,
});

platform.on(platform.events.loginSuccess, async (e) => {
    console.log("login success event triggered");
    // call_ringout()

    // retrieve account data
    // app.get("/data", (req, res) => {
    //     platform.get(`/restapi/v1.0/account/~`)
    //         .then(async (r) => {
    //             res.send(await r.json())
    //         }).catch((e) => {
    //             console.log("account err", e)
    //         });
    // })




    // all 
    platform.get(`/restapi/v1.0/account/~/extension`)
    .then(async(r) => {
        console.log("account",await r.json())
    }).catch((e) => {
        console.log("account err", e)
    });

    // platform.get(`/restapi/v1.0/account/~/extension/335412004`)
    // .then(async(r) => {
    //     console.log("account",await r.json())
    // }).catch((e) => {
    //     console.log("account err", e)
    // });

    // List Company Phone Numbers
    // platform.get(`/restapi/v1.0/account/~/phone-number`)
    // .then(async(r) => {
    //     console.log("phone-number",await r.json())
    // }).catch((e) => {
    //     console.log("account err", e)
    // });



    // subscribe
    // const subscription = subscriptions.createSubscription();

    // subscription.on(subscription.events.notification, evt => {
    //     // console.log(JSON.stringify(evt, null, 2));


    //     if (evt.body?.parties?.[0]?.direction === "Inbound" && evt.body?.parties?.[0]?.status?.code === "Setup") {
    //         // app.post("/webhook-call", (req, res) => {
    //         console.log("if => hold/forward..");

    //         console.log("evt from", evt.body.parties[0].from);
    //         console.log("evt to", evt.body.parties[0].to);
    //         console.log("evt ownerId", evt.ownerId);
    //         // 2
    //         // let hold_address = `/restapi/v1.0/account/~/telephony/sessions/${evt.body.telephonySessionId}/parties/${evt.body.parties[0].id}/hold`;
    //         // 1
    //         let forward_address = `/restapi/v1.0/account/~/telephony/sessions/${evt.body.telephonySessionId}/parties/${evt.body.parties[0].id}/forward`;
    //         // 3
    //         // let forwarding_number = `/restapi/v1.0/account/~/telephony/sessions/${evt.body.telephonySessionId}/parties/${evt.body.parties[0].id}/forwarding_number`;

    //              // 1
    //              platform.post(forward_address, {
    //              phoneNumber: "+17183608087"
    //              })

    //             // 2
    //             // platform.post(hold_address)

    //             // 3
    //             //platform.post(forwarding_number)

    //             // 4
    //             //  let transfer_address = `/restapi/v1.0/account/~/telephony/sessions/${evt.body.telephonySessionId}/parties/${evt.body.parties[0].id}/transfer`;
    //             //      platform.post(transfer_address, 
    //             //         {
    //             //         "phoneNumber":"+14102059080"
    //             //         })

    //             .then((r) => {
    //                 console.log("forwardresponse", r)

    //             }).catch((e) => {
    //                 console.log("forward err", e)
    //             });

    //         // })
    //     }
    // });
    // await subscription
    //     .setEventFilters(['/restapi/v1.0/account/~/telephony/sessions'])
    //     .register();

    // platform.get('/restapi/v1.0/subscription').then((response) => {
    //     console.log("subscription", response);
    // createSubscription();
    // });

})


async function call_ringout() {
    try {
        var resp = await platform.post('/restapi/v1.0/account/~/extension/~/ring-out', {
            'from': { 'phoneNumber': '+1(929)3784727' },
            'to': { 'phoneNumber': '+14102059080' },
            'playPrompt': false
        })
        var jsonObj = await resp.json()
        console.log("Call placed. Call status: " + jsonObj.status.callStatus)
    } catch (e) {
        console.log(e.message)
    }
}



// '/restapi/v1.0/account/~/telephony/sessions'
app.post("/createSubscription", (req, res) => {
    platform.post('/restapi/v1.0/subscription', {
        "eventFilters":
            req.body.events
        ,
        "deliveryMode": {
            "transportType": "WebHook",
            "address": `${process.env.SERVER_URL}/webhook-call?auth_token=1234`
        }
    }).then((response) => {
        console.log("createSubscription", response)
        res.send(response)

    }).catch(function (e) {
        console.error("Error creating webooks in:", e);
    });
})
app.get("/subscription", (req, res) => {
    platform.get('/restapi/v1.0/subscription').then((response) => {
        //console.log("subscription", response);
        res.send(response);
    });
})
app.post("/webhook-call", (req, res) => {
    // console.log("webhook called", req.body)
    // console.log("response", req.body);
    return res.sendStatus(200);
    if (req.body?.body?.parties) {
        console.log("parties", req.body?.body?.parties);
    }

    if (req.body.validationToken) {
        res.set({
            'Validation-Token': req.body.validationToken,
        });
    }

    if (req.body?.body?.parties) {
        setTimeout(() => {
            let forward_address = `/restapi/v1.0/account/~/telephony/sessions/${req.body.body.telephonySessionId}/parties/${req.body.body.parties[0].id}/hold`;
            console.log(forward_address);
            // platform.post(forward_address, {
            //     "phoneNumber": "+14102059003"
            // });
            platform.post(forward_address);
        }, 5000);
    }
})


let token = null;
// app.post("/auth/callback", (req, res) => {
//     console.log("callback psot called", req.body)
//     token = req.body.code;

//     res.send("<html><body><h1>Success</h1></body></html>")
// })

app.use('/', proxy('http://127.0.0.1:3001'));

app.listen(8000, () => console.log('Server ready'))