const express = require('express');
const userController = require('../controllers/userController');
const { validateToken } = require('../middlewares/auth');

const router = express.Router();

router.post('', userController.checkRegisteredEmail);
router.post('/login', userController.login);
router.post('/signup', userController.signUp);
router.post('/kakao', userController.kakaoLogin);
router.patch('/mypage/theme', validateToken, userController.modifyTheme);
router.get(
  '/reservationLists',
  validateToken,
  userController.getReservationLists
);
router.get('/loginedUser', validateToken, userController.getUserByid);
module.exports = { router };
