const { dataSource } = require('../../src/models/dataSource');

const createReview = (reviewList) => {
  const data = [];

  for (const reviews of reviewList) {
    data.push([
      reviews.id,
      reviews.content,
      reviews.view_score,
      reviews.safety_score,
      reviews.cost__score,
      reviews.clean_score,
      reviews.convenience_score,
      reviews.user_id,
      reviews.camp_id,
    ]);
  }

  return dataSource.query(
    `INSERT INTO reviews(
      id,
      content,
      view_score,
      safety_score,
      cost__score,
      clean_score,
      convenience_score,
      user_id,
      camp_id
    ) VALUES ?`,
    [data]
  );
};

module.exports = {
  createReview,
};
