
const bodyParser = require('body-parser');
const env = require('dotenv').config();
const express = require('express');
const app = express();
const SDK = require('@ringcentral/sdk').SDK;

app.use(bodyParser.json());

const rcsdk = new SDK({
    server: SDK.server.sandbox,
    clientId: 'cdEAc0xDReCbXSoXaMZyzA',
    clientSecret: 'Y3cP9ajxT16nNQ9BLh89KAGJcruo-dQZGtBv1CXmsmBw',
    redirectUri: `${process.env.SERVER_URL}/auth/callback`
});

var platform = rcsdk.platform();

// platform.login()
// platform.login({
//     jwt: 'eyJraWQiOiI4NzYyZjU5OGQwNTk0NGRiODZiZjVjYTk3ODA0NzYwOCIsInR5cCI6IkpXVCIsImFsZyI6IlJTMjU2In0.eyJhdWQiOiJodHRwczovL3BsYXRmb3JtLmRldnRlc3QucmluZ2NlbnRyYWwuY29tL3Jlc3RhcGkvb2F1dGgvdG9rZW4iLCJzdWIiOiI4MDQ3NTMwMDUiLCJpc3MiOiJodHRwczovL3BsYXRmb3JtLmRldnRlc3QucmluZ2NlbnRyYWwuY29tIiwiZXhwIjozODM0NzUzMTUwLCJpYXQiOjE2ODcyNjk1MDMsImp0aSI6Il9aYXNtTGV2Um1LbThmY3VVclBMbFEifQ.ReNNPc8lewgugx9gKJcVgq0JQKn5JhdJkJPl3O8OUW45y5gr5_4m8HH5uyCn7knI83uA2AE4_9OwdEHJCJo96Y8qtQb_3-X6NakAzOjAF_GrVWnbjne5K2FE1f7UCo4UZavsTOh4Lse-UNYAzYak7KvUHqT2l5YJkiIuJ_qLxeylUMGGAG8_ttQtzNm5cEC9AdTOELZzPESW5Lnbto7TuaIrlotYzGBqaWs-YLC8_EYlBUHxyW0P_MPkt1_NWuLNHWepeFsn74wMur_PqReVSVWiqXfkrOPd68T91g5ogvXXFWw2syx_ZfJM7AG7Pbl_qG9qvEzWYkXcJdydy4T4KQ'
// }).then(resp => {

//     console.log("login success")
// }).catch(e => {

//     console.log("login error", e)
// });

platform.on(platform.events.loginSuccess, function (e) {
    console.log("login success event triggered");
    platform.post('/restapi/v1.0/subscription', {
        "eventFilters": [
            '/restapi/v1.0/account/~/telephony/sessions'
        ],
        "deliveryMode": {
            "transportType": "WebHook",
            "address": `${process.env.SERVER_URL}/webhook?auth_token=1234`
        }
    }).then((response) => {
        console.log(response)

    }).catch(function (e) {
        console.error("Error creating webooks in:", e);
    });
})

app.post("/webhook", (req, res) => {
    // console.log("webhook called", req.body)
    // console.log("response", req.body);
    if (req.body?.body?.parties) {
        console.log("parties", req.body?.body?.parties);
    }

    if (req.body.validationToken) {
        res.set({
            'Validation-Token': req.body.validationToken,
        });
    }


    res.sendStatus(200);
    
    let forward_address = `/restapi/v1.0/account/~/telephony/sessions/${req.body.body.telephonySessionId}/parties/${req.body.body.parties[0].id}/transfer`;
    console.log(forward_address);
    platform.post(forward_address, {
        "phoneNumber": "+14102059003"
    });
})

app.get("/auth/callback", (req, res) => {
    console.log("callback get called", req.query)
    console.log("req.url", req.url);

    var loginOptions = rcsdk.parseLoginRedirect("?code=" + req.query.code);
    console.log("loginOptions", loginOptions);

    platform.login(loginOptions).then(resp => {
        console.log("login success")
    }).catch(e => {
        console.log("login error", e)
    })
    res.sendStatus(200);
})
let token = null;
app.post("/auth/callback", (req, res) => {
    console.log("callback psot called", req.body)
    token = req.body.code;


    res.send("<html><body><h1>Success</h1></body></html>")
})
app.get("/authenticate", (req, res) => {
    // console.log(rcsdk.loginUrl());
    let url = rcsdk.loginUrl();
    res.redirect(url);
});
app.listen(8000, () => console.log('Server ready'));