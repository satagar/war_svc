'use strict';
const courier = require("./courier");
const order = require("./order");
const user = require("./user");

module.exports = {
    User: user,
    Order: order,
    Courier: courier
}