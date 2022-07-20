const router = require('express').Router();
const filterUserTicketsController = require('../../controllers/userOPerations/filterTicketsController');
const verifyAccessToken = require('../../middleware/verifyAccessToken');

router.get('/filter-user-tickets', verifyAccessToken, filterUserTicketsController.handleFilterUserTickets);

module.exports = router;
