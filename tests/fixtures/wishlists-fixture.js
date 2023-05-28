const { dataSource } = require('../../src/models/dataSource');

const createWishes = (wishList) => {
  let data = [];

  for (const wishlists of wishList) {
    data.push([
      wishlists.id,
      wishlists.userId,
      wishlists.campId,
      wishlists.createdAt,
      wishlists.updatedAt,
    ]);
  }
  return dataSource.query(
    `INSERT INTO wishlists(
      id,
      user_id,
      camp_id,
      created_at,
      updated_at
    ) VALUES ?`,
    [data]
  );
};

module.exports = {
  createWishes,
};
