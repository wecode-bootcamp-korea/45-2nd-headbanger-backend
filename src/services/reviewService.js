const reviewDao = require('../models/reviewDao');

const getReview = async (campId) => {
  const dada = await reviewDao.searchCampId(campId);
  if (!(dada == [])) {
    const result = await reviewDao.getReview(campId);
    return result;
  }
  return dada;
};

module.exports = {
  getReview,
};
