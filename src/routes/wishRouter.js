const express = require('express');
const wishController = require('../controllers/wishController');
const checkToken = require('../middlewares/auth');

const router = express.Router();

router.post('/:campId', checkToken.validateToken, wishController.postWish);

module.exports = {
  router,
};
