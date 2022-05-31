const sendSMS = require('./sendSMS');

const sendOTPsms = async () =>{

    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    
    try{
        await sendSMS(otp);
        return otp;
    }
    catch(err){
        return err;
    }
}

module.exports = sendOTPsms;