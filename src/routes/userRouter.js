const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('', userController.checkRegisteredEmail);
router.post('/login', userController.login);
router.post('/signup', userController.signUp);
router.post('/kakao', userController.kakaoLogin);

module.exports = { router };
