const router = require('express').Router();
const filterUserTicketsController = require('../../controllers/userOPerations/filterTicketsController');

router.get('/filter-user-tickets', filterUserTicketsController.handleFilterUserTickets);

module.exports = router;