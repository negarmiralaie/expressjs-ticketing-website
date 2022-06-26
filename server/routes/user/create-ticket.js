const router = require('express').Router();
const createTicketController = require('../../controllers/userOPerations/createTicketController');

router.post('/create/:id', createTicketController.handleCreateTicket);

module.exports = router;