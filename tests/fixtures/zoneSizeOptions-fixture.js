const { dataSource } = require("../../src/models/dataSource")

const createZoneSizeOptions = (zoneOptionList) => {
  let data = [];

  for (const option of zoneOptionList) {
    data.push([
      option.id,
      option.additionalPrice,
      option.maxPeople
    ]);
  }

  return dataSource.query(
    `INSERT INTO zone_size_options (
      id,
      additional_price,
      max_people
    ) VALUES ?
  `, [ data ]
  )
}


module.exports = { createZoneSizeOptions }