const express = require('express');
const reviewController = require('../controllers/reviewController');

const checkToken = require('../middlewares/auth');

const router = express.Router();

router.get('/:campId', reviewController.getReview);
router.post('', checkToken.validateToken, reviewController.postReview);

module.exports = {
  router,
};
