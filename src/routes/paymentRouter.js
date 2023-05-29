const express = require('express');
const paymentController = require('../controllers/paymentController');
const { validateToken } = require('../middlewares/auth');

const router = express.Router();

router.patch('',validateToken ,paymentController.cancelPayment);

module.exports = {
  router,
};