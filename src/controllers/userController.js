const userService = require('../services/userService');
const { catchAsync } = require('../middlewares/error');
const {
  emailValidationCheck,
  passwordValidationCheck,
} = require('../utils/validationCheck');
const { dataSource } = require('../models/dataSource');

const checkRegisteredEmail = catchAsync(async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'MISSING KEY' });

  const emailValidation = await emailValidationCheck(email);

  if (!emailValidation)
    return res.status(400).json({ message: 'NOT A VALID EMAIL' });

  const result = await userService.checkRegisteredEmail(email);

  if (result) return res.status(200).json({ message: 'USER EXISTS' });
  return res.status(200).json({ message: 'USER DOES NOT EXIST' });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    const error = new Error('KEY ERROR');
    error.statusCode = 400;
    throw error;
  }

  const emailValidation = await emailValidationCheck(email);
  const passwordValidation = await passwordValidationCheck(password);

  if (!emailValidation || !passwordValidation)
    return res.status(400).json({ message: 'INPUT ERROR' });

  const token = await userService.login(email, password);
  if (!token) res.status(400).json({ message: 'FAIL' });
  return res.status(200).send({ accessToken: token });
});

const signUp = catchAsync(async (req, res) => {
  const { email, password, name, phoneNumber } = req.body;
  if (!email || !password || !name || !phoneNumber) {
    const error = new Error('KEY ERROR');
    error.statusCode = 400;
    throw error;
  }

  const emailValidation = await emailValidationCheck(email);
  const passwordValidation = await passwordValidationCheck(password);

  if (!passwordValidation || !emailValidation)
    return res
      .status(400)
      .json({ message: 'PASSWORD OR EMAIL FAILED VALIDATION CHECK' });

  await userService.signUp(email, password, name, phoneNumber);
  return res.status(200).json({ message: 'SIGN UP SUCCESS' });
});

const kakaoLogin = catchAsync(async (req, res) => {
  const { accessToken } = req.body;

  if (!accessToken) return res.status(400).json({ message: 'NO ACCESS TOKEN' });

  const token = await userService.kakaoLogin(accessToken);

  if (!token) return res.status(400).json({ message: 'FAIL' });
  return res.status(200).send({ webToken: token });
});

const modifyTheme = catchAsync(async (req, res) => {
  const userId = req.user;
  const { themeId } = req.body;

  const result = await userService.modifyTheme(userId, themeId);

  return res.status(200).json({ message: 'MODIFY SUCCESS', result });
});

const getReservationLists = catchAsync(async (req, res) => {
  const userId = req.user;

  const scheduledReservation = await userService.getScheduledReservationLists(
    userId
  );
  const pastReservation = await userService.getPastReservationLists(userId);
  const cancelledReservation = await userService.getCancelledReservationLists(
    userId
  );

  return res.status(200).send({
    scheduledList: scheduledReservation,
    pastList: pastReservation,
    cancelledList: cancelledReservation,
  });
});

const getUserByid = catchAsync(async (req, res) => {
  const userId = req.user;
  const result = await userService.getUserByid(userId);
  return res.status(200).json({ result });
});
module.exports = {
  checkRegisteredEmail,
  login,
  signUp,
  kakaoLogin,
  modifyTheme,
  getReservationLists,
  getUserByid,
};
