const TrezSmsClient = require("trez-sms-client");
const client = new TrezSmsClient("username", "password");

// Send code
const sendSmsCode = () =>{
    client.manualSendCode("09913628740", "Signiture Footer For Branding")
        .then((messageId) => {
        console.log("Sent Message ID: " + messageId);
    })
    .catch(error => console.log(error));
}

// Check sent code verification
const checkSmsVerification = () => {
    client.checkCode("09913628740", "123456")
    .then((isValid) => {
        if (isValid) {
            console.log("Code 595783 for this number 09301234567 is valid and verified.");
        }
        else {
            console.log("Provided code for that number is not valid!");
        }
    })
    .catch(error => console.log(error));

};

// Send message
const sendSms = () =>{
    client.sendMessage(sender, numbers, message, groupId)
        .then((receipt) => {
            console.log("Receipt: " + receipt);
        })
        .catch((error) => {
                // If there is an error, we'll catch that
                console.log(error.isHttpException, error.code, error.message);
        });
}


// To check sent message status
const checkSentMessageStatus = () =>{
    client.messageStatus(groupId)
        .then((result) => {
            console.log(result[0].received, result[0].status, result[0].message, result[0].number);
        })
        .catch((error) => {
            console.log(error.isHttpException, error.code, error.message);
        });
}

// To check recieved messages
const from = 1557695398; // from date in timestamp
const to = 1557868230; // till date in timestamp
const page = 1;

client.receivedMessages(receiver, from, to, page)
.then((result) => {
    console.log(result.totalPages, result.currentPage, result.messages); // 10, 1, [{from: 09381234567, date: 1557695511, message: 'سلام'}]
})
.catch((error) => {
    console.log(error.isHttpException, error.code, error.message);
});

module.exports = { sendSmsCode, checkSmsVerification, sendSms, checkSentMessageStatus}