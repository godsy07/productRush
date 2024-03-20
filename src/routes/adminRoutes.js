const express = require('express');

const AdminController = require('../controller/AdminController');

const router = express.Router()

router.post('/login', AdminController.login);

module.exports = router;
