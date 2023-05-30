const { dataSource } = require('../../src/models/dataSource');

const createReviews = (reviewList) => {
  let data = [];

  for (const reviews of reviewList) {
    data.push([
      reviews.id,
      reviews.content,
      reviews.viewScore,
      reviews.safetyScore,
      reviews.costScore,
      reviews.cleanScore,
      reviews.convenienceScore,
      reviews.userId,
      reviews.campId,
    ]);
  }
  return dataSource.query(
    `INSERT INTO reviews(
      id,
      content,
      view_score,
      safety_score,
      cost_score,
      clean_score,
      convenience_score,
      user_id,
      camp_id
    ) VALUES ?`,
    [data]
  );
};

module.exports = {
  createReviews,
};
