const { dataSource } = require('./dataSource');
const queryBuilder = require('./queryBuilder');

const searchCampId = async (campId) => {
  try {
    return await dataSource.query(
      `SELECT 
    camps.id
    FROM camps
    WHERE camps.id=?`,
      [campId]
    );
  } catch (err) {
    const error = new Error(`INVALID_DATA_INPUT😮`);
    error.statusCode = 400;
    throw error;
  }
};

const getReview = async (campId) => {
  try {
    const reviewBaseQuery = `SELECT 
      r.content,
      (r.view_score +
      r.safety_score +
      r.cost__score +
      r.clean_score +
      r.convenience_score)/ 5 AS avgGrade,
    JSON_OBJECT (
        'view_score',r.view_score,
        'safety_score',r.safety_score,
      'cost_score',r.cost__score,
      'clean_score',r.clean_score,
      'convenience_score',r.convenience_score)AS grade,
      r.user_id,
      u.name
    FROM reviews AS r
    JOIN camps AS c ON r.camp_id = c.id
    JOIN users AS u ON r.user_id = u.id
`;
    const averageViewScoreBaseQuery = `SELECT
      AVG (r.view_score) AS avg_view,
      AVG (r.safety_score) AS avg_safety,
      AVG (r.cost__score) AS avg_cost,
      AVG (r.clean_score) AS avg_clean,
      AVG (r.convenience_score) AS avg_convenience,
      (AVG (r.view_score) +
      AVG (r.safety_score) + 
      AVG (r.cost__score) +
      AVG (r.clean_score) +
      AVG (r.convenience_score) ) / 5 AS total_avg_grade
      FROM reviews r`;

    const whereCondition = queryBuilder.getFiltering({ campId: campId });
    const groupCondition = `GROUP BY r.content, r.user_id, r.camp_id, r.view_score, r.safety_score, r.cost__score, r.clean_score, r.convenience_score;`;

    const getReviewWherecampId = await dataSource.query(
      `${reviewBaseQuery} ${whereCondition} ${groupCondition}`
    );
    const averageViewScoreWherecampID = await dataSource.query(
      `${averageViewScoreBaseQuery} ${whereCondition} `
    );
    const result = {
      reviews: getReviewWherecampId,
      total_grade: averageViewScoreWherecampID,
    };
    return result;
  } catch (err) {
    const error = new Error(`INVALID_DATA_INPUT😮`);
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  searchCampId,
  getReview,
};
