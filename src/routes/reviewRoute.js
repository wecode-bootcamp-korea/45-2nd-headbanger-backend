const express = require('express');
const reviewController = require('../controllers/reviewController');

const router = express.Router();

router.get('/:campId', reviewController.getReview);

module.exports = {
  router,
};
