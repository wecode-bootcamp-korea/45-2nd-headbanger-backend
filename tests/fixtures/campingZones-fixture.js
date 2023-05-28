const { dataSource } = require("../../src/models/dataSource")

const createCampingZones = (campingZoneList) => {
  let data = [];

  for (const campingZone of campingZoneList) {
    data.push([
      campingZone.id,
      campingZone.zoneName,
      campingZone.x1,
      campingZone.x2,
      campingZone.x3,
      campingZone.x4,
      campingZone.y1,
      campingZone.y2,
      campingZone.y3,
      campingZone.y4,
      campingZone.zoneSizeOptionId,
      campingZone.campId
    ]);
  }

  return dataSource.query(
    `INSERT INTO camping_zones (
      id,
      zone_name,
      x1,
      x2,
      x3,
      x4,
      y1,
      y2,
      y3,
      y4,
      zone_size_option_id,
      camp_id
    ) VALUES ?
  `, [ data ]
  )
}


module.exports = { createCampingZones }