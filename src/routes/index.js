const express = require('express');

const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
const paymentRouter = require('./paymentRouter');

const router = express.Router();

router.use('/users', userRouter.router);
router.use('/products', productRouter.router);
router.use('/payments', paymentRouter.router);

module.exports = router;
