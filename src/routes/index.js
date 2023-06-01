const express = require('express');

const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
const reviewRouter = require('./reviewRouter');
const wishRouter = require('./wishRouter');
const reservationRouter = require('./reservationRouter');
const paymentRouter = require('./paymentRouter');

const router = express.Router();

router.use('/users', userRouter.router);
router.use('/reviews', reviewRouter.router);
router.use('/products', productRouter.router);
router.use('/wishs', wishRouter.router);
router.use('/reservations', reservationRouter.router);
router.use('/payments', paymentRouter.router);

module.exports = router;
