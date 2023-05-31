const reservationService = require('../services/reservationService');
const { catchAsync } = require('../middlewares/error');

const cancelReservation = catchAsync(async (req, res) => {
    const userId = req.user;
    const { reservationId } = req.body;

    const result = await reservationService.cancelReservation(userId, reservationId);

    if (!result) return res.status(400).json({ message: 'CANCEL FAIL' });

    return res.status(200).json({ message: 'CANCEL SUCCESS', cancelReservation: result});
  });

  module.exports = {
    cancelReservation,
  };