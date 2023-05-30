const { dataSource } = require('../../src/models/dataSource');

const createAmenities = (amenityList) => {
  let data = [];

  for (const amenity of amenityList) {
    data.push([amenity.id, amenity.amenity_name]);
  }

  return dataSource.query(
    `INSERT INTO amenities(
            id,
            amenity_name
        ) VALUES ?
        `,
    [data]
  );
};

module.exports = { createAmenities };
