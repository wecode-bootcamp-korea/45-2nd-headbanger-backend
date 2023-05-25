const express = require('express');

const productController = require('../controllers/productController');
const checkToken = require('../middlewares/auth');

const router = express.Router();

router.get('/:campId', productController.getCampById);
router.get(
  '',
  checkToken.validateTokenUserUndefined,
  productController.getProductList
);
router.get('/:campId/camping-zone', productController.getZoneByCampId);
router.get('/campingZone', productController.getCampingZone);

module.exports = {
  router,
};
