const reviewService = require('../services/reviewService');
const { catchAsync } = require('../middlewares/error');

const getReview = catchAsync(async (req, res) => {
  const { campId } = req.params;
  const isArray = await reviewService.getReview(campId);

  const result =
    isArray.reviews[0] == undefined
      ? res.status(400).json({ message: `INVALID_campId😦` })
      : res.status(200).json({ result: isArray });
  return result;
});

module.exports = {
  getReview,
};
