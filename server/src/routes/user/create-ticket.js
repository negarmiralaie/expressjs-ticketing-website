const router = require('express').Router();
const createTicketController = require('../../controllers/userOPerations/createTicketController');
const verifyAccessToken = require('../../middleware/verifyAccessToken');
const {
  validateCreateTickerFields,
  validate,
} = require('../../middleware/validateFields/validateFields');

router.post('/create-ticket', verifyAccessToken, validateCreateTickerFields, validate, createTicketController.handleCreateTicket);

module.exports = router;
