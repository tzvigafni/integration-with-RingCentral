const express = require('express');
const app = express();

const connection = require('../../config/connection');
const env = require('dotenv').config();
const SDK = require('@ringcentral/sdk').SDK;

const router = express.Router();
exports.router = router;

const rcsdk = new SDK({
    server: SDK.server.sandbox,
    clientId: process.env.RC_CLIENT_ID,
    clientSecret: process.env.RC_CLIENT_SECRET,
    redirectUri: `${process.env.SERVER_URL}/auth/callback`
});
exports.rcsdk = rcsdk;

app.use(require("cors")());

router.get('/', async (req, res) => {
    if (req.session.tokens != undefined) {
        let platform = rcsdk.platform();
        platform.auth().setData(
            req.session.tokens
        );

        if (platform.loggedIn()) {
            try {
                let resp = await platform.get(`/restapi/v1.0/account/~/extension`);
                res.status(200).send(await resp.json());
            } catch (e) {
                res.status(500).send("Error: --" + e.message);
            }
        }
    }
    // res.status(502);
    //   res.redirect(".././login")
});

router.get('/getoutline', async (req, res) => {

    const c = connection;
    const [integrationResponse] = c.query(
        `SELECT * FROM integrations WHERE platform = 'RingCentral' AND installation_token=?`,
        [req.session.tokens.phonedo_business_id]
    );
    const phonedoBusinessId = integrationResponse[0];
    
    let myHeaders = new Headers();
    myHeaders.append("Authorization", phonedoBusinessId);

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("https://core.phonedo.cloud/api/hot_lines", requestOptions)
        .then(response => response.text())
        .then(result => {
            res.send(result)
        })
        .catch(error => console.log('error getHotlines ', error));
})

router.get('/saveagents', async (req, res) => {

    const { extensionId, phoneNumber } = req.query;

    if (req.session.tokens != undefined) {
        let platform = rcsdk.platform();
        platform.auth().setData(
            req.session.tokens
        );

        if (platform.loggedIn()) {
            try {

                let resp = await platform.post(`/restapi/v1.0/account/~/extension/${extensionId}/forwarding-number`, {
                    phoneNumber: phoneNumber,
                    type: "Other",
                    label: 'update in- ' + new Date().getTime()
                })
                let jsonObj = await resp.json()
                console.log("Forwarding number created.")
                console.log("Forwarding number id: " + jsonObj.id)
                res.send(jsonObj)
            } catch (e) {
                res.send("Error: " + e.message);
            }
        }
    }
})

module.exports = router;
