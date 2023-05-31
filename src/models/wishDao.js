const { dataSource } = require('./dataSource');
const queryBuilder = require('./queryBuilder');

const postWish = async (userId, campId) => {
  try {
    const getOrUpdateWish = await dataSource.query(
      `INSERT IGNORE INTO wishlists (user_id, camp_id)
      VALUES (?, ?)`,
      [userId, campId]
    );

    if (getOrUpdateWish.affectedRows == 0) {
      await dataSource.query(
        `DELETE FROM wishlists WHERE user_id = ? AND camp_id = ?`,
        [userId, campId]
      );
    }
    return await dataSource.query(
      `SELECT * FROM wishlists WHERE user_id = ? AND camp_id = ?`,
      [userId, campId]
    );
  } catch (err) {
    throw new Error('INVALID_DATA_INPUT 😮');
  }
};

module.exports = {
  postWish,
};
