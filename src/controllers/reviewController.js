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

const postReview = catchAsync(async (req, res) => {
  const userId = req.user;
  const { campId, view, safety, cost, clean, convenience, content } = req.body;
  if (
    !userId ||
    !campId ||
    !view ||
    !safety ||
    !cost ||
    !clean ||
    !convenience ||
    !content
  ) {
    return res.status(400).json({ message: 'KEY_ERROR😞' });
  }

  await reviewService.postReview(
    userId,
    campId,
    view,
    safety,
    cost,
    clean,
    convenience,
    content
  );
  return res.status(201).json({ message: `SUCCESS_INPUT_REVIEW👍` });
});

module.exports = {
  postReview,
  getReview,
};
