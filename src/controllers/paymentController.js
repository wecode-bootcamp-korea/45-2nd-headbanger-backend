const paymentService = require('../services/paymentService');
const { catchAsync } = require('../middlewares/error');

const cancelPayment = catchAsync(async (req, res) => {
    const userId = req.user;
    const { reservationId } = req.body;

    const result = await paymentService.cancelPayment(userId, reservationId);

    if (!result) return res.status(400).json({ message: 'CANCEL FAIL' });

    return res.status(200).json({ message: 'CANCEL SUCCESS'});
  });

  module.exports = {
    cancelPayment,
  };