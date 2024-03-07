const express = require('express');

const CategoryController = require('../controller/CategoryController');
const { isAuth } = require('../middleware/auth');

const router = express.Router()

router.post('/add-category', CategoryController.addCategory);
router.get('/get-categories', CategoryController.getCategories);
router.get('/get-sub-categories/:category_id', CategoryController.getSubCategories);

module.exports = router;
