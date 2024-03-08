const path = require("path");
const express = require("express");

const { uploadCategoryImage } = require("../middleware/files");
const CategoryController = require('../controller/CategoryController');
const { isAuth } = require('../middleware/auth');

const router = express.Router()

router.get('/get-categories', CategoryController.getCategories);
router.get('/get-parent-categories', CategoryController.getParentCategories);
router.get('/get-sub-categories/:category_id', CategoryController.getSubCategories);
router.get('/get-categories-for-product', CategoryController.getCategoriesForProducts);
router.post('/add-category', uploadCategoryImage, CategoryController.addCategory);

module.exports = router;
