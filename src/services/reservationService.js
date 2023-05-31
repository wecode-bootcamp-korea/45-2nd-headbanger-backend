const reservationDao = require('../models/reservationDao');

const cancelReservation = async (userId, reservationId) => {
    return reservationDao.cancelReservation(userId, reservationId);
  };

  module.exports = {
    cancelReservation,
  };