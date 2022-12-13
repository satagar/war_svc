const express = require('express');
const userController = require('../../../controllers/user.controller')
const paymentController = require('../../../controllers/payment.controller');
const locationController = require('../../../controllers/location.controller')
const orderController = require('../../../controllers/order.controller')
const authMiddleware = require('../../../middleware/authValidate.middleware')
const route = express.Router();
//-------------------------------signup routes || login routes----------------
route.post('/signup',userController.sigup)
route.post('/login',userController.login);
//---------------------------------------user find -------------------------------
route.get('/user/filter',userController.filter);
//----------------------------order-------------------------------------------------
route.post('/order',authMiddleware.isValieduser,orderController.createOrder);
route.post('/location/add',authMiddleware.isValieduser,locationController.createLocation)
route.post('/payment/pay',authMiddleware.isValieduser,paymentController.payment)
module.exports = route;