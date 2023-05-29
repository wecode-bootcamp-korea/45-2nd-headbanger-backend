const paymentDao = require('../models/paymentDao');

const cancelPayment = async (userId, reservationId) => {
    return paymentDao.cancelPayment(userId, reservationId);
  };

  module.exports = {
    cancelPayment,
  };