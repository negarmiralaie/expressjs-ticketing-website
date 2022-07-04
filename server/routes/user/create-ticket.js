const router = require('express').Router();
const createTicketController = require('../../controllers/userOPerations/createTicketController');
const verifyAccessToken = require("../../middleware/verifyAccessToken");

router.post('/create/:id', verifyAccessToken, createTicketController.handleCreateTicket);

module.exports = router;