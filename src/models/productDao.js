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
          c.id,
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

    const whereCondition = queryBuilder.getFiltering(
      regionId,
      amenityId,
      themeId,
      campName
    );
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

const getZoneByCampId = async(campId) => {
  try{
    const [result] = await dataSource.query(
      `SELECT
      JSON_ARRAYAGG(
         JSON_OBJECT(
           "id", cz.id,
           "zoneName", cz.zone_name,
           "additionalPrice", zso.additional_price,
           "maxPeople", zso.max_people,
           "coordinates", 
             JSON_OBJECT(
               "x1", cz.x1,
               "x2", cz.x2,
               "x3", cz.x3,
               "x4", cz.x4,
               "y1", cz.y1,
               "y2", cz.y2,
               "y3", cz.y3,
               "y4", cz.y4 
             )
            ) 
          ) zoneInfo
      FROM camping_zones cz
      JOIN zone_size_options zso ON zso.id = cz.zone_size_option_id
      WHERE cz.camp_id = ?`,
      [campId]
    )
    return result
  }catch(error){
    error = new Error('INVALID_DATA');
    error.statusCode = 400;
    throw error;
}};

const campingZoneQuery = 
`SELECT
  JSON_ARRAYAGG(
    JSON_OBJECT(
      "campId", c.id,
      "campingZoneId", cz.id,
      "zoneName", cz.zone_name,
      "additionalPrice", zso.additional_price,
      "maxPeople", zso.max_people,
      "coordinates", 
      JSON_OBJECT(
        "x1", cz.x1,
        "x2", cz.x2,
        "x3", cz.x3,
        "x4", cz.x4,
        "y1", cz.y1,
        "y2", cz.y2,
        "y3", cz.y3,
        "y4", cz.y4 
      )
    )
  )campingZones
FROM camps c
JOIN camping_zones cz ON c.id = cz.camp_id
JOIN zone_size_options zso ON cz.zone_size_option_id = zso.id`

const getAvailableCampingZone = async (campId, startDate, endDate) => {
  try {
  const [availableZone] = await dataSource.query(
    `${campingZoneQuery} 
    LEFT JOIN zones_reservations zr ON cz.id = zr.camping_zone_id
    LEFT JOIN reservations r ON zr.reservation_id = r.id
    WHERE (NOT (? < r.end_date && r.start_date < ?)
      OR r.start_date IS NULL
      OR r.end_date IS NULL
      OR r.reservation_status_id = 3)
      AND c.id = ?`,
    [startDate, endDate, campId]
  )
    return availableZone
  } catch (error) {
    error = new Error('INVALID_DATA');
    error.statusCode = 400;
    throw error;
  }
}

const getUnavailableCampingZone = async (campId, availableZoneNames) => {
  try {
    const [unavailableZone] = await dataSource.query(
      `${campingZoneQuery} 
        WHERE cz.camp_id = ? AND NOT cz.zone_name IN (?)`,
        [campId, availableZoneNames]
    )
    return unavailableZone
  } catch (error) {
      error = new Error('INVALID_DATA');
      error.statusCode = 400;
      throw error;
    }
  };

module.exports = {
  campList,
  getZoneByCampId,
  getAvailableCampingZone,
  getUnavailableCampingZone
};
