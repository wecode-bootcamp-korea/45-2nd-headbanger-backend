const { dataSource } = require("../../src/models/dataSource")

const createCampPictures = (campPictureList) => {
  let data = [];

  for (const campPicture of campPictureList) {
    data.push([
      campPicture.id,
      campPicture.picture,
      campPicture.campId
    ]);
  }

  return dataSource.query(
    `INSERT INTO camp_pictures (
      id,
      picture,
      camp_id
    ) VALUES ?
  `, [ data ]
  )
}

module.exports = { createCampPictures }