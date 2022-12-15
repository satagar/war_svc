const authController = require('../controllers/auth.controller');
const express = require('express');
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);

module.exports = router;