const router = require('express').Router();
const sendSmsController = require('../controllers/sendSmsController');

router.route('/send-sms')
    .post(sendSmsController.sendSms)
    // .get(sendSmsController.getRegister);

module.exports = router;