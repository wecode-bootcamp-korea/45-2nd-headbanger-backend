const express = require('express');
const reservationController = require('../controllers/reservationController');
const { validateToken } = require('../middlewares/auth');

const router = express.Router();

router.patch('',validateToken ,reservationController.cancelReservation);

module.exports = {
  router,
};