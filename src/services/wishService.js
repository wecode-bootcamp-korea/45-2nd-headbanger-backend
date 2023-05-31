const wishDao = require('../models/wishDao');

const postWish = async (userId, campId) => {
  const result = await wishDao.postWish(userId, campId);
  return result;
};

module.exports = {
  postWish,
};
