const reviewDao = require('../models/reviewDao');

const getReview = async (campId) => {
  const result = await reviewDao.getReview(campId);
  return result;
};
const postReview = async (
  userId,
  campId,
  view,
  safety,
  cost,
  clean,
  convenience,
  content
) => {
  const result = await reviewDao.postReview(
    userId,
    campId,
    view,
    safety,
    cost,
    clean,
    convenience,
    content
  );
  return result;
};

module.exports = {
  getReview,
  postReview,
};
