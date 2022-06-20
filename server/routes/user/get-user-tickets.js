const router = require('express').Router();
const getUserTicketsController = require('../../controllers/userOPerations/getUserTicketsController');

router.get('/get-user-tickets/:id', getUserTicketsController.handlegetUserTickets);

module.exports = router;