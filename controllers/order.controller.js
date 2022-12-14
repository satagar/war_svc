const Order = require('../models/order.model')
const User = require('../models/user.model')
const DB = require('../config/db.config')

function orderDatails(req, res) {
    var order = new Order()
    order.date = req.body.date
    order.orderId = req.body.orderId
    order.customerName = req.body.customerName
    order.orderItem = req.body.orderItem
    order.orderQuantity = req.body.orderQuantity
    order.phoneNo = req.body.phoneNo
    order.alternatePhoneNo = req.body.alternatePhoneNo
    order.emailid = req.body.emailid
    order.deliveryAddress = req.body.deliveryAddress
    order.createdOn = req.body.createdOn
    order.updatedOn = req.body.updatedOn
}