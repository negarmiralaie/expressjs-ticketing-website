const router = require('express').Router();
const deleteTicketController = require('../../controllers/userOPerations/deleteTicketController');

router.get('/delete-ticket/:ticketId', deleteTicketController.handleDeleteTicket);

module.exports = router;