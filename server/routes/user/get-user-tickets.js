const router = require('express').Router();
const getUserTicketsController = require('../../controllers/userOPerations/getUserTicketsController');

router.get('/get-user-tickets/:id', getUserTicketsController.handleGetUserTickets);

module.exports = router;