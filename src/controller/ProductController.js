const validateInput = require("../utils/joi/validate");
const { handleServerError } = require("../middleware/errorHandling");

const Category = require("../models/Category");
const { deleteFile } = require("../middleware/files");
const Product = require("../models/Product");
const ProductFilter = require("../models/ProductFilter");

const controller = "CategoryController";

const addProduct = async (req, res) => {
  let image_url = '';
  const image = req.file;
  if (image) {
    image_url = 'uploads/' + req.file.filename;
  }
  try {
    const { name, brand, model, price_details, category_id } = req.body;

    const { error_message } = validateInput("addProductSchema", { name, brand, model, category_id, price_details })
    if (error_message) {
      deleteFile(image);
      return res.status(400).json({ status: false, message: error_message });
    }

    const category = await Category.findById(category_id);
    if (!category) {
      deleteFile(image);
      return res.status(400).json({ status: false, message: "Category not found." });
    }

    
    const seller = req.user;
    const product = await Product.create({ name, brand, model, image_url, category, seller });
    const tempArray = []
    price_details.forEach(data => {
      const { filter, price } = data;
      tempArray.push({ filter, price, product });
    })

    const productFilter = await ProductFilter.insertMany(tempArray)
    product.productFilter = productFilter;
    await product.save();

    let products = seller.products?seller.products:[];
    products = [...products, product];
    seller.products = products;
    await seller.save();

    return res.status(200).json({ status: true, message: "Product has been added." })
  } catch (e) {
    deleteFile(image);
    return handleServerError(res, controller);
  }
}

module.exports = {
  addProduct,
}