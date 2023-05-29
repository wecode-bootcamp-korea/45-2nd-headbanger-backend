const { dataSource } = require("../../src/models/dataSource")

const createCamps = (campList) => {
  let data = [];

  for (const camp of campList) {
    data.push([
      camp.id,
      camp.campsiteName,
      camp.price,
      camp.address,
      camp.latitude, 
      camp.longitude,
      camp.description, 
      camp.thumbnail, 
      camp.viewMap, 
      camp.checkIn, 
      camp.checkOut, 
      camp.regionId, 
      camp.themeId
    ]);
  }

  return dataSource.query(
    `INSERT INTO camps (
      id,
      campsite_name,
      price,
      address,
      latitude, 
      longitude,
      description, 
      thumbnail, 
      view_map, 
      check_in, 
      check_out, 
      region_id, 
      theme_id
    ) VALUES ?
  `, [ data ]
  )
}


module.exports = { createCamps }