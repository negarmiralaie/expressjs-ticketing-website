const router = require('express').Router();
const getUserTicketsController = require('../../controllers/userOPerations/getUserTicketsController');
const verifyAccessToken = require("../../middleware/verifyAccessToken");

router.get('/get-user-tickets/:id', verifyAccessToken, getUserTicketsController.handleGetUserTickets);

module.exports = router;