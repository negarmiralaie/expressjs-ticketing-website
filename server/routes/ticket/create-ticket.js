const router = require('express').Router();
const createTicketController = require('../../controllers/ticketOperaions/createTicketController');
// const { validateLoginFields, validate } = require('../middleware/validateAuthFields/validateAuthFields');

// router.post('/', validateLoginFields, validate , loginController.handleLogin)
router.post('/create/:id', createTicketController.handleCreateTicket);

module.exports = router;