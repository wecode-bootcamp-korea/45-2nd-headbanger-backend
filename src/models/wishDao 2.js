const { dataSource } = require('./dataSource');
const queryBuilder = require('./queryBuilder');

const postWish = async (userId, campId) => {
  try {
    const existWish = await dataSource.query(
      `SELECT
      user_id,
      camp_id
      FROM wishlists
      WHERE user_id = ? AND camp_id = ?`,
      [userId, campId]
    );

    if (existWish.length === 0) {
      await dataSource.query(
        `INSERT INTO wishlists (
          user_id,camp_id
          )VALUES (?,?)`,
        [userId, campId]
      );
      return await dataSource.query(
        `SELECT 
              camp_id
              FROM wishlists
              WHERE user_id = ? AND camp_id =?`,
        [userId, campId]
      );
    } else {
      await dataSource.query(
        `DELETE FROM wishlists
        WHERE user_id =? AND camp_id =?`,
        [userId, campId]
      );
      return await dataSource.query(
        `SELECT 
              camp_id
              FROM wishlists
              WHERE user_id = ? AND camp_id =?`,
        [userId, campId]
      );
    }
  } catch (err) {
    const error = new Error(`INVALID_DATA_INPUT😮`);
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  postWish,
};
