const { dataSource } = require('../../src/models/dataSource');

const createCampsAmenities = (campAmenityList) => {
  let data = [];

  for (const campAmenity of campAmenityList) {
    data.push([campAmenity.id, campAmenity.camp_id, campAmenity.amenity_id]);
  }

  return dataSource.query(
    `INSERT INTO camps_amenities(
            id,
            camp_id,
            amenity_id
        ) VALUES ?`,
    [data]
  );
};

module.exports = { createCampsAmenities };
