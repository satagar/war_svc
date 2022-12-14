const { Router } = require('express')
const order = require('../models/order.model')
Router.get('/orders', (req, res, next) => {
    res.send('Order Page')
})