const express = require('express');
const paymentController = require('../controllers/paymentController');
const checkToken = require('../middlewares/auth');

const router = express.Router();

router.post('', checkToken.validateToken, paymentController.completePayments);
router.post('',checkToken.validateToken ,paymentController.completePayments);

module.exports = {
  router,
};
