const Ghasedak = require("ghasedak");

const sendSMS = async (phoneNumber, text) => {
  try {
    let ghasedak = new Ghasedak(
      "8ba9e78380c0789f01a49ec9b0c7911e9e904f28b98b274d379f3787cbb776cd"
    );

    ghasedak.send({
      message: text,
      receptor: phoneNumber,
      linenumber: "10008566",
    });

    return true;
  } catch (err) {
    return false;
  }

}

module.exports = sendSMS;