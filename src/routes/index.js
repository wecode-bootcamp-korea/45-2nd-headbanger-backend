const express = require('express');

const userRouter = require('./userRouter');
const campRouter = require('./campRouter')
const productRouter = require('./productRouter');

const router = express.Router();

router.use('/users', userRouter.router);
router.use('/camps', campRouter.router)
router.use('/products', productRouter.router);

module.exports = router;
