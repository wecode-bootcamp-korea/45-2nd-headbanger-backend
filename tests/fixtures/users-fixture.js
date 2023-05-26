const { dataSource } = require('../../src/models/dataSource');

const createUsers = (userList) => {
  let data = [];

  for (const user of userList) {
    data.push([
      user.id,
      user.email,
      user.kakao_id,
      user.password,
      user.name,
      user.profile_image,
      user.phone_number,
      user.points,
      user.theme_id,
    ]);
  }

  return dataSource.query(
    `INSERT INTO users (
            id,
            email,
            kakao_id,
            password,
            name,
            profile_image,
            phone_number,
            points,
            theme_id
        ) VALUES ?
        `,
    [data]
  );
};

module.exports = { createUsers };
