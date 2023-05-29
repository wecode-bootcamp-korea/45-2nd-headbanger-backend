const express = require('express');

const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
const reviewRouter = require('./reviewRouter');
const wishRouter = require('./wishRouter');
const reservationRouter = require('./reservationRouter');

const router = express.Router();

router.use('/users', userRouter.router);
router.use('/review', reviewRouter.router);
router.use('/products', productRouter.router);
router.use('/wish', wishRouter.router);
router.use('/reservations', reservationRouter.router);

module.exports = router;
