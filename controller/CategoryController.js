const validateInput = require("../utils/joi/validate");
const { handleServerError } = require("../middleware/errorHandling");

const Category = require("../models/Category");

const controller = "CategoryController";

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate('parent');
    return res.status(200).json({ status: true, categories, message: "Categories have been fetched." })
  } catch (e) {
    return handleServerError(res, controller);
  }
}

const getSubCategories = async (req, res) => {
  try {
    const { category_id } = req.params
    const subCategories = await Category.find({ parent: category_id });
    return res.status(200).json({ status: true, subCategories, message: "Sub-Categories have been fetched." })
  } catch (e) {
    return handleServerError(res, controller);
  }
}

module.exports = {
  getCategories,
  getSubCategories,
}