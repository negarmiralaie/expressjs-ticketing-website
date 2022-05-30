const messagebird = require('messagebird')(process.env.MESSAGEBIRD_API_KEY);
const expresshbs = require('express-handlebars');

const sendSms = (req, res) => {

    const number = "+989229798602";
    messagebird.verify.create(number, {
        template: 'Your verification code is %token%',
    }, (err, response) => {
        if (err) {
        console.log("third")
        console.log(err);
        res.send(err);
        } else {
        console.log("fourth")
        console.log(response);
        const responseId = response.id;
        const responseToken = responseToken;
        console.log('responseId', responseId)
        console.log('responseToken', responseToken)
        res.send(response);
        }
    })
}
module.exports = {sendSms};