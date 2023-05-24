const { dataSource } = require("../../src/models/dataSource")

const createRegions = (regionList) => {
  let data = [];

  for (const region of regionList) {
    data.push([
      region.id,
      region.regionName
    ]);
  }

  return dataSource.query(
    `INSERT INTO regions (
      id,
      region_name
    ) VALUES ?
  `, [ data ]
  )
}


module.exports = { createRegions }