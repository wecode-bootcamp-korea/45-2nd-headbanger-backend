const express = require('express');
const paymentController = require('../controllers/paymentController');
const { validateToken } = require('../middlewares/auth');

const router = express.Router();

router.post('',validateToken ,paymentController.completePayments);

module.exports = {
  router,
};
