const express = require('express');

const UserController = require('../controller/UserController');
const { isAuth } = require('../middleware/auth');

const router = express.Router()

router.post('/login', UserController.login);
router.post('/sign-up', UserController.signUp);
router.get('/get-user/:user_id', UserController.getUser);
router.get('/get-current-user', isAuth, UserController.getCurrentUser);

module.exports = router;
