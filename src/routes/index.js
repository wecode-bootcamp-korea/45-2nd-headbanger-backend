const express = require('express');

const productRouter = require('./productRoute');
const reviewRotuer = require('./reviewRoute');

const router = express.Router();

router.use('/products', productRouter.router);
router.use('/review', reviewRotuer.router);

module.exports = router;
