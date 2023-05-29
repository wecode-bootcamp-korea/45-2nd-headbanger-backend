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

const getWishByUserId = async (userId) => {
  try {
    return await dataSource.query(
      `
  SELECT
    c.campsite_name AS camp_name,
    c.address AS address,
    c.thumbnail AS thumbnail,
    w.camp_id AS camp_id
  FROM camps AS c 
  JOIN wishlists AS w ON c.id = w.camp_id
  JOIN users AS u ON u.id = w.user_id
  WHERE w.user_id = ${userId}
    `
    );
  } catch (err) {
    const error = new Error(`INVALID_DATA_INPUT😮`);
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  postWish,
  getWishByUserId,
};
