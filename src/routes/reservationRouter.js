const express = require('express');
const reservationController = require('../controllers/reservationController');
const checkToken = require('../middlewares/auth');

const router = express.Router();

router.patch('',checkToken.validateToken ,reservationController.cancelReservation);

module.exports = {
  router,
};