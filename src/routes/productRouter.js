const express = require('express');

const productController = require('../controllers/productController');
const checkToken = require('../middlewares/auth');

const router = express.Router();

router.get('/camps/:campId', productController.getCampById);
router.get(
  '',
  checkToken.validateTokenUserUndefined,
  productController.getProductList
);
router.get('/camps/:campId/camping-zone', productController.getAllZoneByCampId);
router.get('/camps', productController.getAvailableCampingZone);

module.exports = {
  router,
};
