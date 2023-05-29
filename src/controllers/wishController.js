const wishService = require('../services/wishService');
const { catchAsync } = require('../middlewares/error');

const postWish = catchAsync(async (req, res) => {
  const userId = req.user;
  const { campId } = req.params;
  if (!userId || !campId) {
    return res.status(400).json({ message: 'KEY_ERROR😞' });
  }
  const result = await wishService.postWish(userId, campId);
  return res.status(201).json({ result });
});

const getWishByUserId = catchAsync(async (req, res) => {
  const userId = req.user;

  const result = await wishService.getWishByUserId(userId);
  return res.status(200).json({ result });
});

module.exports = {
  getWishByUserId,
  postWish,
};
