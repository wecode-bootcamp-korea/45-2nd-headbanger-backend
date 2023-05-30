const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('', productController.getProductList);
router.get('/:campId/camping-zone',productController.getZoneByCampId);
router.get('/campingZone',productController.getCampingZone);

module.exports = {
  router,
};
