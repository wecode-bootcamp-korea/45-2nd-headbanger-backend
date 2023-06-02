const { dataSource } = require('./dataSource');

const checkRegisteredEmail = async (email) => {
  try {
    const [result] = await dataSource.query(
      `SELECT EXISTS(
        SELECT
          id
        FROM
          users
        WHERE
          email = ?
      ) AS registered
      `,
      [email]
    );
    return !!parseInt(result.registered);
  } catch (err) {
    err = new Error('DATASOURCE ERROR');
    err.statusCode = 400;
    throw err;
  }
};

const getUserByEmail = async (email) => {
  try {
    const [user] = await dataSource.query(
      `SELECT
        id,
        email,
        password,
        name
      FROM
        users
      WHERE
        email = ?
      `,
      [email]
    );
    return user;
  } catch (err) {
    err = new Error('DATASOURCE ERROR');
    err.statusCode = 400;
    throw err;
  }
};

const signUp = async (email, securePassword, name, phoneNumber) => {
  try {
    await dataSource.query(
      `INSERT INTO 
        users(
          email,
          password,
          name,
          phone_number
        ) VALUES (?, ?, ?, ?)
      `,
      [email, securePassword, name, phoneNumber]
    );
    return true;
  } catch (err) {
    err = new Error('DATASOURCE ERROR');
    err.statusCode = 400;
    throw err;
  }
};

const checkUserByKakaoId = async (kakaoId) => {
  try {
    const [user] = await dataSource.query(
      `SELECT 
      EXISTS
      (SELECT 1 
      FROM users 
      WHERE kakao_id = ?
      ) 
      `,
      [kakaoId]
    );
    return user;
  } catch (err) {
    err = new Error('DATASOURCE ERROR');
    err.statusCode = 400;
    throw err;
  }
};

const getUserByKakaoId = async (kakaoId) => {
  const user = await dataSource.query(
    `SELECT
        id
        FROM users
        WHERE users.kakao_id = ?
        `,
    [kakaoId]
  );
  return user[0].id;
};

const kakaoSignUp = async (kakaoId, email, nickName) => {
  const user = await dataSource.query(
    `INSERT INTO 
        users(
          kakao_id,
          email,
          name
        ) VALUES (?, ?, ?)
      `,
    [kakaoId, email, nickName]
  );
  return user.insertId;
};

const modifyTheme = async (userId, themeId) => {
  const queryRunner = dataSource.createQueryRunner();

  await queryRunner.connect();

  await queryRunner.startTransaction();

  try {
    const result = await queryRunner.query(
      `
    UPDATE users
      SET theme_id = ?
    WHERE id = ? AND EXISTS (SELECT 1 FROM themes WHERE id = ? )
    `,
      [themeId, userId, themeId]
    );

    if (result.affectedRows !== 1) throw new Error('INVALID_MODIFICATION');

    const modifyResult = await queryRunner.query(
      `
    SELECT
      u.id userId,
      u.theme_id themeId,
      t.theme
    FROM users u
    JOIN themes t ON u.theme_id = t.id
    WHERE u.id = ?
      `,
      [userId]
    );

    await queryRunner.commitTransaction();
    return modifyResult;
  } catch (error) {
    await queryRunner.rollbackTransaction();
    error = new Error('INVALID_DATA');
    error.statusCode = 400;
    throw error;
  } finally {
    await queryRunner.release();
  }
};

const getUserByid = async (userId) => {
  try {
    return await dataSource.query(
      `SELECT 
    u.id,
    u.name,
    u.theme_id,
    u.profile_image
  FROM users AS u
  WHERE u.id =?
  `,
      [userId]
    );
  } catch (error) {
    error = new Error('INVALID_DATA');
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  checkRegisteredEmail,
  getUserByEmail,
  signUp,
  checkUserByKakaoId,
  kakaoSignUp,
  getUserByKakaoId,
  modifyTheme,
  getUserByid,
};
