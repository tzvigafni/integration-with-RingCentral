const RC = require('@ringcentral/sdk').SDK
require('dotenv').config();

var rcsdk = new RC({
    'server':      "https://platform.devtest.ringcentral.com",
    'clientId':     'W8hbjs5iMWtc1ST4kJvKKz',
    'clientSecret': '7JlgcSavluZetec4scTZMR6N1TPSdatZ7c07hXA1HHsh'
});
var platform = rcsdk.platform();
platform.login({ 'jwt':  'eyJraWQiOiI4NzYyZjU5OGQwNTk0NGRiODZiZjVjYTk3ODA0NzYwOCIsInR5cCI6IkpXVCIsImFsZyI6IlJTMjU2In0.eyJhdWQiOiJodHRwczovL3BsYXRmb3JtLmRldnRlc3QucmluZ2NlbnRyYWwuY29tL3Jlc3RhcGkvb2F1dGgvdG9rZW4iLCJzdWIiOiI4MDQ3NTMwMDUiLCJpc3MiOiJodHRwczovL3BsYXRmb3JtLmRldnRlc3QucmluZ2NlbnRyYWwuY29tIiwiZXhwIjozODM0NzUzMTUwLCJpYXQiOjE2ODcyNjk1MDMsImp0aSI6Il9aYXNtTGV2Um1LbThmY3VVclBMbFEifQ.ReNNPc8lewgugx9gKJcVgq0JQKn5JhdJkJPl3O8OUW45y5gr5_4m8HH5uyCn7knI83uA2AE4_9OwdEHJCJo96Y8qtQb_3-X6NakAzOjAF_GrVWnbjne5K2FE1f7UCo4UZavsTOh4Lse-UNYAzYak7KvUHqT2l5YJkiIuJ_qLxeylUMGGAG8_ttQtzNm5cEC9AdTOELZzPESW5Lnbto7TuaIrlotYzGBqaWs-YLC8_EYlBUHxyW0P_MPkt1_NWuLNHWepeFsn74wMur_PqReVSVWiqXfkrOPd68T91g5ogvXXFWw2syx_ZfJM7AG7Pbl_qG9qvEzWYkXcJdydy4T4KQ'})

platform.on(platform.events.loginSuccess, function(response) {
  console.log("1.. ");
  get_user_call_answering_rules()
})

async function get_user_call_answering_rules() {
  try {
    console.log("2.. ");
    var resp = await platform.get('https://platform.devtest.ringcentral.com/restapi/v1.0/account/~/extension/', {
      'view': "Detailed",
      'enabledOnly': false
    })
    let jsonObj = await resp.json()
    for (var record of jsonObj.records) {
      get_user_call_answering_rule(record.id)
    }
  } catch (e) {
    console.log("error => " + e.message)
  }
}

async function get_user_call_answering_rule(id) {
  try {
    console.log("3.. ");
    console.log(id);
    var resp = await platform.get('https://platform.devtest.ringcentral.com/restapi/v1.0/account/335412004/extension/804753005/' + id)
    let jsonObj = await resp.json()
    console.log("=> " + jsonObj)
  } catch (e) {
    console.log("error 2 => ", e.message)
  }
}