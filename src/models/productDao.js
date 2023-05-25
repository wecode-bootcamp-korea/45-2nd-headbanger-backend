const { dataSource } = require('./dataSource');
const queryBuilder = require('./queryBuilder');

const campList = async (
  regionId,
  amenityId,
  themeId,
  orderBy,
  campName,
  limit,
  offset
) => {
  try {
    const baseQuery = `
        SELECT
          c.campsite_name,
          c.price,
          c.address,
          c.thumbnail,
          r.region_name,
        GROUP_CONCAT(DISTINCT a.amenity_name SEPARATOR ',') AS amenity,
          t.theme,
        COUNT(DISTINCT w.id) AS whislist_count
      FROM camps AS c
      JOIN regions AS r ON c.region_id = r.id
      JOIN camps_amenities AS ca ON c.id = ca.camp_id
      JOIN amenities AS a ON a.id = ca.amenity_id
      JOIN themes AS t ON c.theme_id = t.id
      JOIN wishlists AS w ON c.id = w.camp_id
      `;

    const whereCondition = queryBuilder.getFiltering({
      regionId: regionId,
      themeId: themeId,
      amenityId: amenityId,
      campName: campName,
    });
    const sortQuery = queryBuilder.getOrdering(orderBy);
    const limitQuery = queryBuilder.getLimit(limit, offset);
    const makeArray = queryBuilder.isArray(amenityId);
    const groupCondition = `GROUP BY c.id`;
    const havingCondition = amenityId
      ? `HAVING COUNT(DISTINCT ca.amenity_id) = ${makeArray.length}`
      : '';

    const result = await dataSource.query(
      `${baseQuery} ${whereCondition} ${groupCondition} ${havingCondition} ${sortQuery} ${limitQuery}`
    );

    return result;
  } catch (error) {
    error = new Error('INVALID_DATA');
    error.statusCode = 400;
    throw error;
  }
};
module.exports = {
  campList,
};
