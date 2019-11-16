const Nexmo = require('nexmo');
const nexmo = new Nexmo({
  apiKey: '56388ae8',
  apiSecret: 'FfsC5o5N7Ih5sGax'
});

nexmo.sms = (number, mesg)=> {
    nexmo.message.sendSms('1234567890', number, mesg, (err, responseData) => {
        if (err) {
          console.log(err);
        } else {
          console.dir(responseData);
        }
      }
);
}



module.exports = nexmo;