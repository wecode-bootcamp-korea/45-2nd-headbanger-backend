const express = require('express');

const productRouter = require('./productRoute');

const router = express.Router();

router.use('/products', productRouter.router);

module.exports = router;
