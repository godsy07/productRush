const express = require('express');

const { isAuth } = require('../middleware/auth');
const UserController = require('../controller/UserController');

const router = express.Router()

router.post('/login', UserController.login);
router.post('/admin-login', UserController.adminLogin);
router.post('/sign-up', UserController.signUp);
router.get('/get-user/:user_id', UserController.getUser);
router.get('/get-current-user', isAuth, UserController.getCurrentUser);

module.exports = router;
