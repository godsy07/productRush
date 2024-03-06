const express = require('express');

const UserController = require('../controller/UserController');

const router = express.Router()

router.post('/login', UserController.login);
router.post('/sign-up', UserController.signUp);

module.exports = router;
