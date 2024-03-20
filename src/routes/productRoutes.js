const express = require("express");

const { uploadMultipleImagesOptional, uploadProductImages } = require("../middleware/files");
const { isAuth, isSeller } = require('../middleware/auth');
const ProductController = require('../controller/ProductController');

const router = express.Router()

router.get('/get-products/', ProductController.getPaginatedProducts);
router.get('/get-my-products', isAuth, isSeller, ProductController.getMyProducts);
router.post('/add-products', isAuth, isSeller, uploadProductImages, ProductController.addProduct);
router.get('/get-product-reviews', isAuth, ProductController.getProductReviews);
router.post('/add-product-review', isAuth, uploadMultipleImagesOptional, ProductController.addProductReview);

module.exports = router;
