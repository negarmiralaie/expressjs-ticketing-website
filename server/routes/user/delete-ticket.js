const router = require('express').Router();
const deleteTicketController = require('../../controllers/userOPerations/deleteTicketController');
const verifyAccessToken = require("../../middleware/verifyAccessToken");

router.get('/delete-ticket/:ticketId', verifyAccessToken, deleteTicketController.handleDeleteTicket);

module.exports = router;