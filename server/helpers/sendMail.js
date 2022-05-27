const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const dotenv = require('dotenv');

dotenv.config();

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
);

oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

async function sendMail(email, subject, text) {
    
    try{
        const accessToken = await oauth2Client.getAccessToken();
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                type: 'OAuth2',
                user: process.env.AUTH_EMAIL,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refresh_token: process.env.REFRESH_TOKEN,
                accessToken: process.env.ACCESS_TOKEN
            }
        });

        const mailOptions = {
            from: `NEGAR!! -> ${process.env.AUTH_MAIL}`,
            to: "negarmiralaie@gmail.com",
            subject: subject,
            text: text
        };
        const result = await transport.sendMail(mailOptions);
        return result;
    }
    catch(error){
        console.log('error is:', error);
        return error;
    }
}

module.exports = sendMail;
