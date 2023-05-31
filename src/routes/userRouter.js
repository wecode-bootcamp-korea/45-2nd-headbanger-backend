const express = require('express');
const userController = require('../controllers/userController');
const checkToken = require('../middlewares/auth');

const router = express.Router();

router.post('', userController.checkRegisteredEmail);
router.post('/login', userController.login);
router.post('/signup', userController.signUp);
router.post('/kakao', userController.kakaoLogin);
router.patch('/mypage/theme', checkToken.validateToken, userController.modifyTheme);
router.get('/reservation-lists', checkToken.validateToken, userController.getReservationLists);
router.get('/loginedUser', checkToken.validateToken, userController.getUserByid);

module.exports = { router };
