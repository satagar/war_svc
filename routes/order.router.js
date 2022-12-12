const express = require('express');
const { fetchAllOrders } = require('../controllers/order.controller');
const router = express.Router();

router.get("/getOrders", fetchAllOrders);

module.exports = router;