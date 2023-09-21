 const RC = require('@ringcentral/sdk').SDK
// const path = require('path')
// // Remember to modify the path to where you saved your .env file!
// require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

// // For the purpose of testing the code, we put the SMS recipient number in the environment variable.
// // Feel free to set the SMS recipient directly.
// const RECIPIENT    = '14102059003'

// // Instantiate the SDK and get the platform instance
// var rcsdk = new RC({
//     'server':       'https://platform.devtest.ringcentral.com',
//     'clientId':     '43BdSWkU9Cqc2WFz33F5tA',
//     'clientSecret': '5mMZL0FE3NobPxFGHZ5ulj6G2wxAuARSSaaTx6V624lt'
// });
// var platform = rcsdk.platform();

// /* Authenticate a user using a personal JWT token */
// platform.login({ 
//     'jwt': 'eyJraWQiOiI4NzYyZjU5OGQwNTk0NGRiODZiZjVjYTk3ODA0NzYwOCIsInR5cCI6IkpXVCIsImFsZyI6IlJTMjU2In0.eyJhdWQiOiJodHRwczovL3BsYXRmb3JtLmRldnRlc3QucmluZ2NlbnRyYWwuY29tL3Jlc3RhcGkvb2F1dGgvdG9rZW4iLCJzdWIiOiI4MDQ3NTMwMDUiLCJpc3MiOiJodHRwczovL3BsYXRmb3JtLmRldnRlc3QucmluZ2NlbnRyYWwuY29tIiwiZXhwIjozODM0NzUzMTUwLCJpYXQiOjE2ODcyNjk1MDMsImp0aSI6Il9aYXNtTGV2Um1LbThmY3VVclBMbFEifQ.ReNNPc8lewgugx9gKJcVgq0JQKn5JhdJkJPl3O8OUW45y5gr5_4m8HH5uyCn7knI83uA2AE4_9OwdEHJCJo96Y8qtQb_3-X6NakAzOjAF_GrVWnbjne5K2FE1f7UCo4UZavsTOh4Lse-UNYAzYak7KvUHqT2l5YJkiIuJ_qLxeylUMGGAG8_ttQtzNm5cEC9AdTOELZzPESW5Lnbto7TuaIrlotYzGBqaWs-YLC8_EYlBUHxyW0P_MPkt1_NWuLNHWepeFsn74wMur_PqReVSVWiqXfkrOPd68T91g5ogvXXFWw2syx_ZfJM7AG7Pbl_qG9qvEzWYkXcJdydy4T4KQ'
//  })

// platform.on(platform.events.loginSuccess, function(e){
//     read_extension_phone_number_detect_sms_feature()
// });

// platform.on(platform.events.loginError, function(e){
//     console.log("Unable to authenticate to platform. Check credentials.", e.message)
//     process.exit(1)
// });

// /*
//   Read phone number(s) that belongs to the authenticated user and detect if a phone number
//   has the SMS capability
// */
// async function read_extension_phone_number_detect_sms_feature(){
//     try {
//         let endpoint = "/restapi/v1.0/account/~/extension/~/phone-number"
//         var resp = await platform.get(endpoint)
//         var jsonObj = await resp.json()
//         for (var record of jsonObj.records){
//             for (feature of record.features){
//                 if (feature == "SmsSender"){
//                     // If a user has multiple phone numbers, check and decide which number
//                     // to be used for sending SMS message.
//                     return send_sms(record.phoneNumber)
//                 }
//             }
//         }
//         if (jsonObj.records.length == 0)
//           console.log("This user does not own a phone number!")
//         else
//           console.log("None of this user's phone number(s) has the SMS capability!")
//     } catch(e) {
//         console.log(e.message)
//         process.exit(1)
//     }
// }

// /*
//  Send a text message from a user own phone number to a recipient number
// */
// async function send_sms(fromNumber){
//     try {
//         let bodyParams = {
//             from: { phoneNumber: fromNumber },
//             to: [ { phoneNumber: RECIPIENT} ],
//             // To send group messaging, add more (max 10 recipients) 'phoneNumber' object. E.g.
//             /*
//             to: [
//                { phoneNumber: RECIPIENT },
//                { phoneNumber: 'Recipient-Phone-Number' }
//              ],
//             */
//             text: 'Hello World!'
//         }
//         let endpoint = "/restapi/v1.0/account/~/extension/~/sms"
//         var resp = await platform.post(endpoint, bodyParams)
//         var jsonObj = await resp.json()
//         console.log("SMS sent. Message id: " + jsonObj.id)
//         check_message_status(jsonObj.id);
//     } catch(e) {
//         console.log(e.message)
//         process.exit(1)
//     }
// }

// /*
//  Check the sending message status until it's out of the queued status
// */
// async function check_message_status(messageId){
//     try {
//         let endpoint = `/restapi/v1.0/account/~/extension/~/message-store/${messageId}`
//         let resp = await platform.get(endpoint);
//         let jsonObj = await resp.json()
//         console.log("Message status: ", jsonObj.messageStatus)
//         if (jsonObj.messageStatus == "Queued"){
//           await sleep (5000);
//           check_message_status(jsonObj.id);
//         }
//     } catch (e) {
//       console.log(e.message)
//       process.exit(1)
//     }
// }

// const sleep = async (ms) => {
//   await new Promise(r => setTimeout(r, ms));
// }


//2
// const SDK = require('ringcentral')
const dotenv = require('dotenv')

dotenv.config()

var rcsdk = new RC({
    'server':       'https://platform.devtest.ringcentral.com',
    'clientId':     '43BdSWkU9Cqc2WFz33F5tA',
    'clientSecret': '5mMZL0FE3NobPxFGHZ5ulj6G2wxAuARSSaaTx6V624lt'
});

const platform = rcsdk.platform()

platform.login({
   'jwt': 'eyJraWQiOiI4NzYyZjU5OGQwNTk0NGRiODZiZjVjYTk3ODA0NzYwOCIsInR5cCI6IkpXVCIsImFsZyI6IlJTMjU2In0.eyJhdWQiOiJodHRwczovL3BsYXRmb3JtLmRldnRlc3QucmluZ2NlbnRyYWwuY29tL3Jlc3RhcGkvb2F1dGgvdG9rZW4iLCJzdWIiOiI4MDQ3NTMwMDUiLCJpc3MiOiJodHRwczovL3BsYXRmb3JtLmRldnRlc3QucmluZ2NlbnRyYWwuY29tIiwiZXhwIjozODM0NzUzMTUwLCJpYXQiOjE2ODcyNjk1MDMsImp0aSI6Il9aYXNtTGV2Um1LbThmY3VVclBMbFEifQ.ReNNPc8lewgugx9gKJcVgq0JQKn5JhdJkJPl3O8OUW45y5gr5_4m8HH5uyCn7knI83uA2AE4_9OwdEHJCJo96Y8qtQb_3-X6NakAzOjAF_GrVWnbjne5K2FE1f7UCo4UZavsTOh4Lse-UNYAzYak7KvUHqT2l5YJkiIuJ_qLxeylUMGGAG8_ttQtzNm5cEC9AdTOELZzPESW5Lnbto7TuaIrlotYzGBqaWs-YLC8_EYlBUHxyW0P_MPkt1_NWuLNHWepeFsn74wMur_PqReVSVWiqXfkrOPd68T91g5ogvXXFWw2syx_ZfJM7AG7Pbl_qG9qvEzWYkXcJdydy4T4KQ'
}).then(response => {
  var params = {
    from: { phoneNumber: '9167582815' },
    to: [
      { phoneNumber: '14102059003' }
    ],
    text: 'This is a test message from Node JS in Ring Central by Gafni'
  }
  platform.post('/account/~/extension/~/sms', params)
    .then(response => {
      console.log('SMS sent. Delivery status: ' + response.json().messageStatus)
    }).catch(e => {
      console.error("error 1", e)
    })
}).catch(e => {
  console.error("error 2", e)
})