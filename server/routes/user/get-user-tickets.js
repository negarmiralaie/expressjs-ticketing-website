const router = require('express').Router();
const getUserTicketsController = require('../../controllers/userOPerations/getUserTicketsController');
const verifyAccessToken = require("../../middleware/verifyAccessToken");

router.get('/get-user-tickets', verifyAccessToken, getUserTicketsController.handleGetUserTickets);

module.exports = router;