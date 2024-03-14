const express = require("express");

const { uploadImage } = require("../middleware/files");
const { isAuth, isSeller } = require('../middleware/auth');
const ProductController = require('../controller/ProductController');

const router = express.Router()

router.get('/get-products/', ProductController.getPaginatedProducts);
router.get('/get-my-products', isAuth, isSeller, ProductController.getMyProducts);
router.post('/add-products', isAuth, isSeller, uploadImage, ProductController.addProduct);

module.exports = router;
