const express = require("express");
const router = express.Router();

const env = require('dotenv').config();
const SDK = require('@ringcentral/sdk').SDK;

const rcsdk = new SDK({
    server: SDK.server.sandbox,
    clientId: process.env.RC_CLIENT_ID,
    clientSecret: process.env.RC_CLIENT_SECRET,
    redirectUri: `${process.env.SERVER_URL}/auth/callback`
});

router.get('/', async (req, res) => {
    if (req.session.tokens != undefined) {
        let platform = rcsdk.platform()
        platform.auth().setData(req.session.tokens)
        if (platform.loggedIn()) {
            try {
                let resp = await platform.logout()
                console.log("logged out")
            } catch (e) {
                console.log(e)
            }
        }
        req.session.tokens = null
    }
    res.send("logeed out!!")
});

module.exports = router;