const wishDao = require('../models/wishDao');

const postWish = async (userId, campId) => {
  const result = await wishDao.postWish(userId, campId);
  return result;
};
const getWishByUserId = async (userId) => {
  const result = await wishDao.getWishByUserId(userId);
  return result;
};

module.exports = {
  postWish,
  getWishByUserId,
};
