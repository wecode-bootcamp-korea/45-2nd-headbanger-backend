const reviewDao = require('../models/reviewDao');

const getReview = async (campId) => {
  const result = await reviewDao.getReview(campId);
  return result;
};

module.exports = {
  getReview,
};
