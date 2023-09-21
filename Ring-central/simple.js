const RC = require('@ringcentral/sdk').SDK

const SERVER_URL = "https://platform.devtest.ringcentral.com";
const CLIENT_ID = "5AAYVUsiHaZfR3UwZiCckn";
const CLIENT_SECRET = "9dARooulaiLcEGnkNgKarqfrONPKcr2zwesDFb1xJeFZ";
const JWT_TOKEN = "eyJraWQiOiI4NzYyZjU5OGQwNTk0NGRiODZiZjVjYTk3ODA0NzYwOCIsInR5cCI6IkpXVCIsImFsZyI6IlJTMjU2In0.eyJhdWQiOiJodHRwczovL3BsYXRmb3JtLmRldnRlc3QucmluZ2NlbnRyYWwuY29tL3Jlc3RhcGkvb2F1dGgvdG9rZW4iLCJzdWIiOiI4MDQ3NTMwMDUiLCJpc3MiOiJodHRwczovL3BsYXRmb3JtLmRldnRlc3QucmluZ2NlbnRyYWwuY29tIiwiZXhwIjozODQxOTE3ODI0LCJpYXQiOjE2OTQ0MzQxNzcsImp0aSI6ImNGSlhvTTZTU3k2S2FLQTJwY0pFUEEifQ.FxapuWA-oADtFGGPMFtiu0OIu9Tu9JwbC0-C5fSbsyxftrukKH9HnHgeaQek0q_lHXcuksj960TIZtB11uUnWC9vR8OM-3pBAFIgB1G9E1U6PVFNz8QxG9QhYTzeHnRBRL7odl-x0tVX-u100cIwA1rTc9RAMLKL1513pC6_NzFVgxcKJ2V_ozDxri658HPyqiht2wzjFiAFXlVt1DrtjZO6TiVtLOdr-AF5_B1q_rVop980lGwy6KnFzQeGJ3unfIcQ4_78hjcoPSMv7s8cEWvq1OQMSe0ojzoQ91ZRDR9umRENopC2NWlCqUPVuhIacFAoTLhxJiJ8hDJLS10O8g";

var rcsdk = new RC({
    'server': SERVER_URL,
    'clientId': CLIENT_ID,
    'clientSecret': CLIENT_SECRET
});
var platform = rcsdk.platform();
platform.login({ 'jwt': JWT_TOKEN })

platform.on(platform.events.loginSuccess, () => {
    list_extensions()
})

async function list_extensions() {
    try {
        var resp = await platform.get("/restapi/v1.0/account/~/extension")
        var json = await resp.json()
        console.log("All records =>");
        console.log(json.records);
        console.log("Table =>");
        var rowpatt = '| %s | %s | %s |'
        console.log(rowpatt,
            "Extension".padEnd(10),
            "Name".padEnd(30),
            "Type".padEnd(12))
        for (var record of json.records) {
            if (record.name) {
                console.log(rowpatt,
                    record.extensionNumber.padStart(10),
                    record.name.padEnd(30),
                    record.type.padEnd(12))
            }
        }
    } catch (e) {
        console.log(e.message)
    }
}
