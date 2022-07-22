const nodemailer = require('nodemailer');

const sendEmail = async (email, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'negarmiralaie@gmail.com',
      pass: 'lktnvdlnhuioebka',
    },
  });

  const mailOptions = {
    from: 'negarmiralaie@gmail.com',
    to: email,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.log(err);
    else console.log(`Email is successfully sent: ${info.response}`);
  });
};

module.exports = sendEmail;
