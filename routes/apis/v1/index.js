const express = require('express');
const userController = require('../../../controllers/user.controller')
const paymentController = require('../../../controllers/payment.controller');
const locationController = require('../../../controllers/location.controller')
const orderController = require('../../../controllers/order.controller')
const authMiddleware = require('../../../middleware/authValidate.middleware')
const {checkInput} = require('../../../middleware/location.middleware')
const {checkInputforPaymet} = require('../../../middleware/payment.middleware');
const { inputCheck } = require('../../../middleware/order.middleware');
const route = express.Router();
//-------------------------------signup routes || login routes----------------
route.post('/signup',userController.sigup)
route.post('/login',userController.login);
//---------------------------------------user find -------------------------------
route.get('/user/filter',authMiddleware.isValieduser,userController.filter);
//----------------------------order-------------------------------------------------
route.post('/order',authMiddleware.isValieduser,inputCheck,orderController.createOrder);
route.post('/location/add',authMiddleware.isValieduser,checkInput,locationController.createLocation)
route.post('/payment/pay',authMiddleware.isValieduser,checkInputforPaymet,paymentController.payment)
route.put('/order/update',authMiddleware.isValieduser,orderController.updateOrder);
route.delete('/order/delete',authMiddleware.isValieduser,orderController.deleteOrder)
//-------------------------------------payment filters--------------------------------------
route.get('/payment/filter',authMiddleware.isValieduser,paymentController.paymentFilter);
//----------------------------------order filter-----------------------------------------------
route.get('/order/filter',authMiddleware.isValieduser,orderController.orderFilrter)
module.exports = route;