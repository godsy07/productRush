const express = require("express");

const { uploadImage } = require("../middleware/files");
const { isAuth, isAdmin } = require('../middleware/auth');
const CategoryController = require('../controller/CategoryController');

const router = express.Router()

router.get('/get-categories', CategoryController.getCategories);
router.get('/get-parent-categories', CategoryController.getParentCategories);
router.get('/get-sub-categories/:category_id', CategoryController.getSubCategories);
router.get('/get-categories-for-product', CategoryController.getCategoriesForProducts);
router.post('/add-category', isAuth, isAdmin, uploadImage, CategoryController.addCategory);
router.post('/add-category-filters', isAuth, isAdmin, CategoryController.addCategoryFilters);
router.get('/get-category-filters', CategoryController.getCategoryFilters);
router.get('/get-categories-with-no-filters', CategoryController.getCategoriesWithNoFilters);

module.exports = router;
