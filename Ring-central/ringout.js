// const RC = require('@ringcentral/sdk').SDK
// require('dotenv').config();

// var rcsdk = new RC({
//   'server': "https://platform.devtest.ringcentral.com",
//   'clientId': 'cdEAc0xDReCbXSoXaMZyzA',
//   'clientSecret': 'Y3cP9ajxT16nNQ9BLh89KAGJcruo-dQZGtBv1CXmsmBw'
// });

// var platform = rcsdk.platform();
// platform.login({ 'jwt': 'eyJraWQiOiI4NzYyZjU5OGQwNTk0NGRiODZiZjVjYTk3ODA0NzYwOCIsInR5cCI6IkpXVCIsImFsZyI6IlJTMjU2In0.eyJhdWQiOiJodHRwczovL3BsYXRmb3JtLmRldnRlc3QucmluZ2NlbnRyYWwuY29tL3Jlc3RhcGkvb2F1dGgvdG9rZW4iLCJzdWIiOiI4MDQ3NTMwMDUiLCJpc3MiOiJodHRwczovL3BsYXRmb3JtLmRldnRlc3QucmluZ2NlbnRyYWwuY29tIiwiZXhwIjozODM0NzUzMTUwLCJpYXQiOjE2ODcyNjk1MDMsImp0aSI6Il9aYXNtTGV2Um1LbThmY3VVclBMbFEifQ.ReNNPc8lewgugx9gKJcVgq0JQKn5JhdJkJPl3O8OUW45y5gr5_4m8HH5uyCn7knI83uA2AE4_9OwdEHJCJo96Y8qtQb_3-X6NakAzOjAF_GrVWnbjne5K2FE1f7UCo4UZavsTOh4Lse-UNYAzYak7KvUHqT2l5YJkiIuJ_qLxeylUMGGAG8_ttQtzNm5cEC9AdTOELZzPESW5Lnbto7TuaIrlotYzGBqaWs-YLC8_EYlBUHxyW0P_MPkt1_NWuLNHWepeFsn74wMur_PqReVSVWiqXfkrOPd68T91g5ogvXXFWw2syx_ZfJM7AG7Pbl_qG9qvEzWYkXcJdydy4T4KQ' })

// platform.on(platform.events.loginSuccess, () => {
//   console.log("lOGIN SUCCESS...")
//    call_ringout()
// })

// var jsonObj;

// async function call_r
// ingout() {
//   try {
//     var resp = await platform.post('/restapi/v1.0/account/~/extension/~/ring-out', {
//       'from': { 'phoneNumber': '+19167582815' },
//       'to': { 'phoneNumber': 
//      // '972548425660'
//        '14102059003' 
//     },
//       'playPrompt': false,

//     })
//     jsonObj = await resp.json()
//     console.log("Call placed. Call : " , jsonObj)

//   } catch (e) {
//     console.log("error =>", e.message)
//   }

// setInterval(async () => {
//   try {

//     var resp2 = await platform.post(' /restapi/v1.0/account/~/telephony/call-out',
//     {
//       "from": {
//         "deviceId": "803469127021"
//       },
//       "to": {
//         "phoneNumber": "+79817891689"
//       }
//     }
//     )
//     // var resp2 = await platform.delete(`/restapi/v1.0/account/~/extension/~/ring-out/${jsonObj.id}`)
//     // var jsonObj2 = await resp2.json()
//     console.log("Call placed. Call status: " , resp2.status)
//    } catch (e) {
//     console.log("error =>", e.message)
//   }

// }, 1500)

// }


// 2

// https://developers.ringcentral.com/my-account.html#/applications
// Find your credentials at the above url, set them as environment variables, or enter them below

// PATH PARAMETERS
// const accountId = '<ENTER VALUE>';

// // POST BODY
// const body = {
//     from: {
//         deviceId: '59474004'
//     },
//     to: {
//         phoneNumber: '+16502223366',
//         extensionNumber: '103'
//     }
// };

// const SDK = require('ringcentral');
// const rcsdk = new SDK({server: process.env.serverURL, appKey: process.env.clientId, appSecret: process.env.clientSecret});
// const platform = rcsdk.platform();
// platform.login({ username: process.env.username, extension: process.env.extension, password: process.env.password }).then(() => {
//     platform.post(`/restapi/v1.0/account/${accountId}/telephony/call-out`, body).then((r) => {
//         // PROCESS RESPONSE
//     });
// });



//3

// var rcsdk = new RC({
//   'server': "https://platform.devtest.ringcentral.com",
//   'clientId': 'cdEAc0xDReCbXSoXaMZyzA',
//   'clientSecret': 'Y3cP9ajxT16nNQ9BLh89KAGJcruo-dQZGtBv1CXmsmBw'
// });

// var platform = rcsdk.platform();
// platform.login({
//   'jwt': 'eyJraWQiOiI4NzYyZjU5OGQwNTk0NGRiODZiZjVjYTk3ODA0NzYwOCIsInR5cCI6IkpXVCIsImFsZyI6IlJTMjU2In0.eyJhdWQiOiJodHRwczovL3BsYXRmb3JtLmRldnRlc3QucmluZ2NlbnRyYWwuY29tL3Jlc3RhcGkvb2F1dGgvdG9rZW4iLCJzdWIiOiI4MDQ3NTMwMDUiLCJpc3MiOiJodHRwczovL3BsYXRmb3JtLmRldnRlc3QucmluZ2NlbnRyYWwuY29tIiwiZXhwIjozODM0NzUzMTUwLCJpYXQiOjE2ODcyNjk1MDMsImp0aSI6Il9aYXNtTGV2Um1LbThmY3VVclBMbFEifQ.ReNNPc8lewgugx9gKJcVgq0JQKn5JhdJkJPl3O8OUW45y5gr5_4m8HH5uyCn7knI83uA2AE4_9OwdEHJCJo96Y8qtQb_3-X6NakAzOjAF_GrVWnbjne5K2FE1f7UCo4UZavsTOh4Lse-UNYAzYak7KvUHqT2l5YJkiIuJ_qLxeylUMGGAG8_ttQtzNm5cEC9AdTOELZzPESW5Lnbto7TuaIrlotYzGBqaWs-YLC8_EYlBUHxyW0P_MPkt1_NWuLNHWepeFsn74wMur_PqReVSVWiqXfkrOPd68T91g5ogvXXFWw2syx_ZfJM7AG7Pbl_qG9qvEzWYkXcJdydy4T4KQ'
// })
//   .then(function () {

    // rcsdk.platform()
    //   .post('/account/~/extension/~/ring-out', {
    //     from: { phoneNumber: '19167582815' },
    //     to: { phoneNumber: '14102059003' },
    //     callerId: { phoneNumber: '19167582815' }
    //   })
    //   .then(function (response) {
    //     console.log("Call initiated:", response.json());
    //   })
    //   .catch(function (e) {
    //     console.error("Error initiating call:", e);
    //   });
  //   platform.post('/restapi/v1.0/subscription', {
  //     "eventFilters": [
  //       "/restapi/v1.0/account/~/extension/~/presence?detailedTelephonyState=true&sipData=true",
  //       "/restapi/v1.0/account/~/extension/~/message-store",
  //       "/restapi/v1.0/account/~/extension/~/presence/line",
  //       "/restapi/v1.0/account/~/extension"
  //     ],
  //     "deliveryMode": {
  //       "transportType": "WebHook",

  //       "address": "https://b71d-147-235-79-190.ngrok-free.app/hook?auth_token=1234"
  //     }
  //   }).then((response) => {
  //     console.log(response)
  //   }).catch(function (e) {
  //     console.error("Error creating webooks in:", e);
  //   });
  // })
  // .catch(function (e) {
  //   console.error("Error logging in:", e);
  // });

// rcsdk.platform()
//   .login({
//     'jwt': 'eyJraWQiOiI4NzYyZjU5OGQwNTk0NGRiODZiZjVjYTk3ODA0NzYwOCIsInR5cCI6IkpXVCIsImFsZyI6IlJTMjU2In0.eyJhdWQiOiJodHRwczovL3BsYXRmb3JtLmRldnRlc3QucmluZ2NlbnRyYWwuY29tL3Jlc3RhcGkvb2F1dGgvdG9rZW4iLCJzdWIiOiI4MDQ3NTMwMDUiLCJpc3MiOiJodHRwczovL3BsYXRmb3JtLmRldnRlc3QucmluZ2NlbnRyYWwuY29tIiwiZXhwIjozODM0NzUzMTUwLCJpYXQiOjE2ODcyNjk1MDMsImp0aSI6Il9aYXNtTGV2Um1LbThmY3VVclBMbFEifQ.ReNNPc8lewgugx9gKJcVgq0JQKn5JhdJkJPl3O8OUW45y5gr5_4m8HH5uyCn7knI83uA2AE4_9OwdEHJCJo96Y8qtQb_3-X6NakAzOjAF_GrVWnbjne5K2FE1f7UCo4UZavsTOh4Lse-UNYAzYak7KvUHqT2l5YJkiIuJ_qLxeylUMGGAG8_ttQtzNm5cEC9AdTOELZzPESW5Lnbto7TuaIrlotYzGBqaWs-YLC8_EYlBUHxyW0P_MPkt1_NWuLNHWepeFsn74wMur_PqReVSVWiqXfkrOPd68T91g5ogvXXFWw2syx_ZfJM7AG7Pbl_qG9qvEzWYkXcJdydy4T4KQ'
//   })
//   .then(function(response) {
//     rcsdk.platform()
//       .get('/account/~/extension/~/address-book/contact')
//       .then(function(response) {
//         console.log("1 => " , response.json().records[0]);
//       });
//   })
//   .catch(function(e) {
//     console.error( "2 => " , e);
//   });



//
// https://developers.ringcentral.com/my-account.html#/applications
// Find your credentials at the above url, set them as environment variables, or enter them below
// const SDK = require('ringcentral');
// const rcsdk = new SDK({
//   server: "https://platform.devtest.ringcentral.com",
//   appKey: 'cdEAc0xDReCbXSoXaMZyzA',
//   appSecret: 'Y3cP9ajxT16nNQ9BLh89KAGJcruo-dQZGtBv1CXmsmBw' 
// });
//   const platform = rcsdk.platform();
// platform.login({ 
//         'jwt': 'eyJraWQiOiI4NzYyZjU5OGQwNTk0NGRiODZiZjVjYTk3ODA0NzYwOCIsInR5cCI6IkpXVCIsImFsZyI6IlJTMjU2In0.eyJhdWQiOiJodHRwczovL3BsYXRmb3JtLmRldnRlc3QucmluZ2NlbnRyYWwuY29tL3Jlc3RhcGkvb2F1dGgvdG9rZW4iLCJzdWIiOiI4MDQ3NTMwMDUiLCJpc3MiOiJodHRwczovL3BsYXRmb3JtLmRldnRlc3QucmluZ2NlbnRyYWwuY29tIiwiZXhwIjozODM0NzUzMTUwLCJpYXQiOjE2ODcyNjk1MDMsImp0aSI6Il9aYXNtTGV2Um1LbThmY3VVclBMbFEifQ.ReNNPc8lewgugx9gKJcVgq0JQKn5JhdJkJPl3O8OUW45y5gr5_4m8HH5uyCn7knI83uA2AE4_9OwdEHJCJo96Y8qtQb_3-X6NakAzOjAF_GrVWnbjne5K2FE1f7UCo4UZavsTOh4Lse-UNYAzYak7KvUHqT2l5YJkiIuJ_qLxeylUMGGAG8_ttQtzNm5cEC9AdTOELZzPESW5Lnbto7TuaIrlotYzGBqaWs-YLC8_EYlBUHxyW0P_MPkt1_NWuLNHWepeFsn74wMur_PqReVSVWiqXfkrOPd68T91g5ogvXXFWw2syx_ZfJM7AG7Pbl_qG9qvEzWYkXcJdydy4T4KQ'
//     })
//     .then(() => {
//     platform.get(`/restapi/v1.0/subscription`)
//     .then((r) => {
//       console.log("... ", r);
//         // PROCESS RESPONSE
//     });
// });

//
// https://developers.ringcentral.com/my-account.html#/applications 
// מצא את האישורים שלך בכתובת האתר שלמעלה, הגדר אותם כמשתני סביבה, או הזן אותם למטה 

// PATH PARAMETERS 
const  accountId  =  '+16263400211' 
; const SDK = require ( 'ringcentral' );
const rcsdk = new SDK({
  server: "https://platform.devtest.ringcentral.com",
  appKey: 'cdEAc0xDReCbXSoXaMZyzA',
  appSecret: 'Y3cP9ajxT16nNQ9BLh89KAGJcruo-dQZGtBv1CXmsmBw' 
});           
const platform = rcsdk.platform();
platform.login({ 
          'jwt': 'eyJraWQiOiI4NzYyZjU5OGQwNTk0NGRiODZiZjVjYTk3ODA0NzYwOCIsInR5cCI6IkpXVCIsImFsZyI6IlJTMjU2In0.eyJhdWQiOiJodHRwczovL3BsYXRmb3JtLmRldnRlc3QucmluZ2NlbnRyYWwuY29tL3Jlc3RhcGkvb2F1dGgvdG9rZW4iLCJzdWIiOiI4MDQ3NTMwMDUiLCJpc3MiOiJodHRwczovL3BsYXRmb3JtLmRldnRlc3QucmluZ2NlbnRyYWwuY29tIiwiZXhwIjozODM0NzUzMTUwLCJpYXQiOjE2ODcyNjk1MDMsImp0aSI6Il9aYXNtTGV2Um1LbThmY3VVclBMbFEifQ.ReNNPc8lewgugx9gKJcVgq0JQKn5JhdJkJPl3O8OUW45y5gr5_4m8HH5uyCn7knI83uA2AE4_9OwdEHJCJo96Y8qtQb_3-X6NakAzOjAF_GrVWnbjne5K2FE1f7UCo4UZavsTOh4Lse-UNYAzYak7KvUHqT2l5YJkiIuJ_qLxeylUMGGAG8_ttQtzNm5cEC9AdTOELZzPESW5Lnbto7TuaIrlotYzGBqaWs-YLC8_EYlBUHxyW0P_MPkt1_NWuLNHWepeFsn74wMur_PqReVSVWiqXfkrOPd68T91g5ogvXXFWw2syx_ZfJM7AG7Pbl_qG9qvEzWYkXcJdydy4T4KQ'
      }).then(() => {
    platform.get(`/restapi/v1.0/account/${accountId}`).then((r) => {
        // PROCESS RESPONSE
    });
});