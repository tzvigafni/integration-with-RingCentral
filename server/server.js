const bodyParser = require('body-parser');
const env = require('dotenv').config();
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const connection = require("./config/connection");
const phonenumbersRoutes = require('./api/routes/phonenumbers');
const logoutRoutes = require('./api/routes/logout');
const saveagents = require('./api/routes/saveagents');
const { v4: uuidv4 } = require('uuid');
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

app.use(session({
    secret: 'somesecretstring',
    resave: true,
    saveUninitialized: true,
    tokens: '',
    cookie: { secure: true }
}));

const rcsdk = new SDK({
    server: SDK.server.sandbox,
    clientId: process.env.RC_CLIENT_ID,
    clientSecret: process.env.RC_CLIENT_SECRET,
    redirectUri: `${process.env.SERVER_URL}/auth/callback`
});

app.use(express.static('build'));

let platform = rcsdk.platform();

//start
app.post('/requestInstallationURL', (req, res) => {

console.log("Someone tried to log in at - "+ new Date());

    const { user_id, user_type, plugin_id } = req.body || {};
    const installation_token = uuidv4();
    const platform = "RingCentral";
    const installation_status = 0;

    const settings = {
        // board_id: "",
        // incoming_call_summary_list_id: "",
        // outgoing_call_summary_list_id: "",
        // client_id: "",
    };
    const platform_settings = JSON.stringify(settings);

    const phonedo_token = req.headers.authorization.split(' ')?.[1]

    if (!phonedo_token) {
        console.log('Token format is incorrect');
        return res.sendStatus(401).json({ error: "Missing token" });
    }

    const insertTokenQuery = {installation_token ,'phonedo_business_id' : user_id ,user_type,plugin_id,platform, platform_settings,phonedo_token,installation_status};

    let result = connection.create("integrations", insertTokenQuery);
            if (!result) {
                console.log(err);
                res.status(500).send("Server error");
            } else {
                console.log("Data sent and saved successfully! authenticate in -" + new Date());
                res.send({
                    url: `${process.env.SERVER_URL}/authenticate?installationToken=${installation_token}`,
                });
            }
});

// path to connect to - RingCentral.com
app.get('/authenticate', (req, res) => {
    const installationToken = req.query.installationToken || 'default value';
    console.log('installationToken', installationToken);

    let url = rcsdk.loginUrl({
        redirectUri: `${process.env.SERVER_URL}/auth/callback`,
        state: installationToken
    });
    console.log("url => ", url + `&businessId=${installationToken}`);
    res.redirect(url + `&businessId=${installationToken}`);
});

let accessToken;

app.get("/auth/callback", async (req, res) => {
    let resp = await platform.login({
        code: req.query.code,
        redirectUri: process.env.SERVER_URL
    })
        .then(async resp => {
            console.log("login success")
            let datatosave = await resp.json();
            const state = req.query.state;
            datatosave.phonedo_business_id = state;
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
            console.log('Updated save token!');

            req.session.tokens = await datatosave;

             accessToken = JSON.stringify(await datatosave);
              const token = await datatosave;

            const insertTokenQuery = `
            UPDATE integrations 
            SET platform_token=?,installation_status =1
            WHERE installation_token = ?;
            `;

            connection.query(insertTokenQuery,
                [accessToken, state],
                (err, results) => {
                    if (err) {
                        console.log('err', err);
                        res.status(500).send("Server error");
                    } else {
                        console.log("Data updated successfully!");
                         res.status(200).sendFile(path.join(__dirname, 'build', 'index.html'));
                    }
                }
            );
        })
        .catch(e => {
            console.log("login error", e)
            res.sendStatus(400);
        })
})

// Routes
app.use("/getphonenumbers", phonenumbersRoutes);
app.use("/logout", logoutRoutes);

// get user info
app.get("/userinfo", (req, res) => {
    console.log("userInfo -", req.session.tokens);
    res.send(req.session)
});

const subscriptions = new Subscriptions({
    sdk: rcsdk,
});

app.listen(8000, () => console.log('Server ready'))