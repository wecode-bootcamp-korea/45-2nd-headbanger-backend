const { dataSource } = require('../../src/models/dataSource');

const createReviews = (reviewList) => {
  let data = [];

  for (const review of reviewList) {
    data.push([
      review.id,
      review.content,
      review.view_score,
      review.safety_score,
      review.cost_score,
      review.clean_score,
      review.convenience_score,
      review.user_id,
      review.camp_id,
    ]);
  }

  return dataSource.query(
    `INSERT INTO reviews (
        id,
        content,
        view_score,
        safety_score,
        cost_score,
        clean_score,
        convenience_score,
        user_id,
        camp_id
    ), VALUES ?
    `,
    [data]
  );
};

module.exports = { createReviews };
