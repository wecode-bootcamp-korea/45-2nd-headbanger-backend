const express = require('express');
const campController = require('../controllers/campController');

const router = express.Router();

router.get('/:campId/camping-zone',campController.getZoneByCampId);


module.exports = {
  router,
};