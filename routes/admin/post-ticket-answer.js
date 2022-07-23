const router = require('express').Router();
const postTicketAnswerController = require('../../controllers/adminOperations/postTicketAnswerController');
const verifyAccessToken = require('../../middleware/verifyAccessToken');
// const {
//   validateCreateTickerFields,
//   validate,
// } = require('../../middleware/validateFields/validateFields');
const isAdmin = require('../../middleware/isAdmin');

router.post('/post-ticket-answer', verifyAccessToken, isAdmin, postTicketAnswerController.handlePostTicketAnswer);

module.exports = router;
