const { isObjectId, handleServerErrorResponse, handleNotFoundResponse, handleBadRequestResponse } = require("../helpers");
const { User } = require("../models");

const index = async (req, res) => {
    await User.find().then(items => {
        res.status(200).json(items);
    }).catch(error => {
        handleServerErrorResponse(res, error);
    });
}

const create = async (req, res) => {
    await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        role: req.body.role || undefined,
        isEnabled: req.body.isEnabled || undefined
    }).then(data => {
        res.status(201).json(data);
        res.end();
    }).catch(error => {
        handleServerErrorResponse(res, error);
    });
}

const read = async (req, res) => {
    if(!isObjectId(req.params.id)) return handleNotFoundResponse(res, 'Invalid ID');
    await User.findById(req.params.id).then(data => {
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
    await User.findById(req.params.id).then(data => {
        if(data) {
            if(req.body.name) data.name = req.body.name;
            if(req.body.password) data.password = req.body.password;
            if(req.body.email) data.email = req.body.email;
            if(req.body.role) data.role = req.body.role;
            if(req.body.isEnabled) data.isEnabled = req.body.isEnabled;
            if(data.isModified()) {
                data.save().then(data => {
                    res.status(200).json(data);
                    res.end();
                }).catch(error => {
                    handleServerErrorResponse(res, error);
                });
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

const destroy = (req, res) => {
    if(!isObjectId(req.params.id)) return handleNotFoundResponse(res, 'Invalid ID');
    if(req.params.id === req.user.id) return handleBadRequestResponse(res, 'Cannt delete Self');
    User.findById(req.params.id).then(data => {
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

module.exports = {
    index: index,
    create: create,
    read: read,
    update: update,
    destroy: destroy
}