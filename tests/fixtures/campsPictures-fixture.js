const { dataSource } = require('../../src/models/dataSource');

const createCampsPictures = (pictureList) => {
  let data = [];

  for (const picture of pictureList) {
    data.push([picture.id, picture.picture, picture.camp_id]);
  }

  return dataSource.query(
    `INSERT INTO camp_pictures(
            id,
            picture,
            camp_id
        ) VALUES ?
        `,
    [data]
  );
};

module.exports = { createCampsPictures };
