const router = require('express').Router();
const filterUserTicketsController = require('../../controllers/userOPerations/filterTicketsController');

router.get('/filter-user-tickets', filterUserTicketsController.handlefilterUserTickets);

module.exports = router;