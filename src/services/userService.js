const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const userDao = require('../models/userDao');
const reservationdDao = require('../models/reservaionDao');

const checkRegisteredEmail = async (email) => {
  return await userDao.checkRegisteredEmail(email);
};

const login = async (email, password) => {
  try {
    const user = await userDao.getUserByEmail(email);

    const { id: userId, password: userPassword } = user;

    const comparePassword = await bcrypt.compare(password, userPassword);

    if (!comparePassword) return false;

    return jwt.sign(
      {
        id: userId,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXP,
        issuer: process.env.JWT_ISSUER,
      }
    );
  } catch (err) {
    err = new Error('COULD NOT SEND TOKEN');
    err.statusCode = 400;
    throw err;
  }
};

const signUp = async (email, password, name, phoneNumber) => {
  try {
    const existUser = await userDao.checkRegisteredEmail(email);
    const userResult = Number(Object.values(existUser)[0]);

    if (userResult) {
      return false;
    } else {
      const securePassword = await bcrypt.hash(
        password,
        parseInt(process.env.SALTROUND)
      );

      const result = await userDao.signUp(
        email,
        securePassword,
        name,
        phoneNumber
      );

      return result;
    }
  } catch (err) {
    err = new Error('COULD NOT PARSE PASSWORD');
    err.statusCode = 400;
    throw err;
  }
};

const kakaoLogin = async (accessToken) => {
  try {
    const kakaoResult = await axios({
      method: 'POST',
      url: `https://kapi.kakao.com/v2/user/me`,
      headers: {
        authorization: `Bearer ${accessToken}`,
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });
    const {
      id: kakaoId,
      properties: { nickname: nickName },
      kakao_account: { email: email },
    } = kakaoResult.data;

    const user = await userDao.checkUserByKakaoId(kakaoId);
    const userResult = Number(Object.values(user)[0]);

    let userId;
    userResult
      ? (userId = await userDao.getUserByKakaoId(kakaoId))
      : (userId = await userDao.kakaoSignUp(kakaoId, email, nickName));

    return jwt.sign(
      {
        id: userId,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXP,
        issuer: process.env.JWT_ISSUER,
      }
    );
  } catch (err) {
    err = new Error('COULD NOT LOG IN THROUGH KAKAO');
    err.statusCode = 400;
    throw err;
  }
};

const modifyTheme = async(userId, themeId) => {
  return userDao.modifyTheme(userId, themeId);
}

const getScheduledReservationLists = async(userId) => {
  return reservationdDao.getScheduledReservationLists(userId)
}

const getPastReservationLists = async(userId) => {
  return reservationdDao.getPastReservationLists(userId)
}

const getCancelledReservationLists = async(userId) => {
  return reservationdDao.getCancelledReservationLists(userId)
}

module.exports = { 
  checkRegisteredEmail, 
  login, 
  signUp, 
  kakaoLogin,
  modifyTheme,
  getScheduledReservationLists,
  getPastReservationLists,
  getCancelledReservationLists
};
