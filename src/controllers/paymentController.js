const paymentService = require('../services/paymentService');
const { catchAsync } = require('../middlewares/error');

const completePayments = catchAsync(async (req, res) => {
  const userId = req.user

  const {
    tid,
    pgToken,
    campingZoneId, 
    startDate, 
    endDate, 
    totalMembers, 
    totalPrice 
  } = req.body;

  const offset = 1000 * 60 * 60 * 9
  const koreaDate = new Date((new Date()).getTime() + offset).toISOString().split('T')[0]

  if (startDate < koreaDate || endDate < koreaDate){
    return res.status(400).json({ message: 'INVALID_DATA' });
  }

  const result = await paymentService.completePayments(
    userId, 
    tid, 
    pgToken, 
    campingZoneId, 
    startDate, 
    endDate, 
    totalMembers, 
    totalPrice
    );

  return res.status(200).json({paymentResult: result});
});

module.exports = {
  completePayments
};