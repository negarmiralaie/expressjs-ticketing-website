const Ghasedak = require('ghasedak');

const sendSMS = async (phoneNumber, text) => {
  try {
    const ghasedak = new Ghasedak(
      process.env.GHASEDAK_API_KEY,
    );

    ghasedak.send({
      message: text,
      receptor: phoneNumber,
      linenumber: '10008566',
    });

    return true;
  } catch (err) {
    return false;
  }
};

module.exports = sendSMS;
