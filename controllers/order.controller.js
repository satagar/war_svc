const { isObjectId, handleServerErrorResponse, handleNotFoundResponse, handleBadRequestResponse } = require("../helpers");
const { Order } = require("../models");

const index = async (req, res) => {
    const query = (req.user.role === 'admin') ? {} : { user: req.user.id };
    await Order.find(query).then(items => {
        res.status(200).json(items);
    }).catch(error => {
        handleServerErrorResponse(res, error);
    });
}

const create = async (req, res) => {
    await Order.create({
        fromAddress: req.body.fromAddress,
        toAddress: req.body.toAddress,
        items: req.body.items,
        user: req.user.id
    }).then(data => {
        res.status(201).json(data);
        res.end();
    }).catch(error => {
        handleServerErrorResponse(res, error);
    });
}

const read = async (req, res) => {
    if(!isObjectId(req.params.id)) return handleNotFoundResponse(res, 'Invalid ID');
    const query = (req.user.role === 'admin') ? {_id: req.params.id} : { user: req.user.id, _id: req.params.id };
    await Order.findOne(query).then(data => {
        if(data) {
            res.status(200).json(data);
            res.end();
        }
        else handleNotFoundResponse(res);
    }).catch(error => {
        handleServerErrorResponse(res, error);
    });
}

const update = async (req, res) => {
    if(!isObjectId(req.params.id)) handleNotFoundResponse(res, 'Invalid ID');
    const query = (req.user.role === 'admin') ? {_id: req.params.id} : { user: req.user.id, _id: req.params.id };
    await Order.findOne(query).then(data => {
        if(data) {
            if(data.status === 'placed') {
                if(req.body.fromAddress) data.fromAddress = req.body.fromAddress;
                if(req.body.toAddress) data.toAddress = req.body.toAddress;
                if(req.body.items) data.items = req.body.items;
                if(data.isModified()) {
                    const saved = await data.save().catch(error => handleServerErrorResponse(res, error));
                    if(saved) res.status(200).json(saved);
                }
                else {
                    res.status(200).json(data);
                }
            }
            else {
                handleBadRequestResponse(res, `This order cannot be updated because the Order is currently ${data.status}`);
            }
        }
        else {
            handleNotFoundResponse(res);
        }
    }).catch(error => {
        handleServerErrorResponse(res, error);
    });
}

const destroy = (req, res) => {
    if(!isObjectId(req.params.id)) return handleNotFoundResponse(res, 'Invalid ID');
    const query = (req.user.role === 'admin') ? {_id: req.params.id} : { user: req.user.id, _id: req.params.id };
    Order.findOne(query).then(data => {
        if(data) {
            data.deleteOne({ _id: req.params.id }).then(data => {
                res.status(200).json(data);
                res.end();
            }).catch(error => {
                handleServerErrorResponse(res, error);
            });
        }
        else {
            handleNotFoundResponse(res);
        }
    }).catch(error => {
        handleServerErrorResponse(res, error);
    });
}

const setCourier = async (req, res) => {
    if(!isObjectId(req.params.id)) handleNotFoundResponse(res, 'Invalid ID');
    await Order.findById(req.params.id).then(data => {
        if(data) {
            if(req.body.status) data.status = req.body.status;
            if(req.body.expectedDeliveryDate) data.expectedDeliveryDate = req.body.expectedDeliveryDate;
            if(req.body.courier) data.courier = req.body.courier;
            if(req.body.airWayBillNumber) data.airWayBillNumber = req.body.airWayBillNumber;
            if(req.body.deliveryCharge) data.deliveryCharge = req.body.deliveryCharge;
            if(data.isModified()) {
                const saved = await data.save().catch(error => handleServerErrorResponse(res, error));
                if(saved) res.status(200).json(saved);
            }
            else {
                res.status(200).json(data);
            }
        }
        else {
            handleNotFoundResponse(res);
        }
    }).catch(error => {
        handleServerErrorResponse(res, error);
    });
}

const setStatus = async (req, res) => {
    if(!isObjectId(req.params.id)) handleNotFoundResponse(res, 'Invalid ID');
    await Order.findById(req.params.id).then(data => {
        if(data) {
            if(req.body.status) {
                switch(req.body.status) {
                    case 'delivered': data.actualDeliveryDate = new Date();
                    default: data.status = req.body.status;
                }
            }
            if(data.isModified()) {
                const saved = await data.save().catch(error => handleServerErrorResponse(res, error));
                if(saved) res.status(200).json(saved);
            }
            else {
                res.status(200).json(data);
            }
        }
        else {
            handleNotFoundResponse(res);
        }
    }).catch(error => {
        handleServerErrorResponse(res, error);
    });
}

module.exports = {
    index: index,
    create: create,
    read: read,
    update: update,
    destroy: destroy,
    setCourier: setCourier,
    setStatus: setStatus
}