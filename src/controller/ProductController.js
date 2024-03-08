const validateInput = require("../utils/joi/validate");
const { handleServerError } = require("../middleware/errorHandling");

const Category = require("../models/Category");
const { deleteFile } = require("../middleware/files");
const Product = require("../models/Product");

const controller = "CategoryController";

const addProduct = async (req, res) => {
  let image_url = '';
  const image = req.file;
  if (image) {
    image_url = 'uploads/' + req.file.filename;
  }
  try {
    const { name, brand, model, price, category_id } = req.body;

    const { error_message } = validateInput("addProductSchema", { name, brand, model, price, category_id })
    if (error_message) {
      deleteFile(image);
      return res.status(400).json({ status: false, message: error_message });
    }

    const category = await Category.findById(category_id);
    if (!category) {
      deleteFile(image);
      return res.status(400).json({ status: false, message: "Category not found." });
    }

    const product = await Product.create({ name, brand, model, price, image_url, category })

    return res.status(200).json({ status: true, product, message: "Product has been added." })
  } catch (e) {
    deleteFile(image);
    return handleServerError(res, controller);
  }
}

module.exports = {
  addProduct,
}