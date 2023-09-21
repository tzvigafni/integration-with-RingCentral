const sdk = require('api')('@dialpad/v1.0#1m14uclj7s8ika');

sdk.app_settingsGet()
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));