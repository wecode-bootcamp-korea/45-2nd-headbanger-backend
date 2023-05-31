const express = require('express');

const productController = require('../controllers/productController');
const checkToken = require('../middlewares/auth');

const multer = require('multer');
const upload = multer();

const router = express.Router();

router.get('/camps/:campId', productController.getCampById);
router.get('', checkToken.validateTokenUserUndefined, productController.getProductList);
router.get('/camps/:campId/camping-zone', productController.getAllZoneByCampId);
router.get('/camps', productController.getAvailableCampingZone);
router.get('/recommended-products', productController.getRecommendedProducts);
router.get('/categories', productController.getAllCategiries);
router.post('/profile-upload', checkToken.validateToken, upload.single('profileImage'), productController.uploadProfileImage);

module.exports = {
  router,
};
