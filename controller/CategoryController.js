const validateInput = require("../utils/joi/validate");
const { handleServerError } = require("../middleware/errorHandling");

const Category = require("../models/Category");

const controller = "CategoryController";

const addCategory = async (req, res) => {
  try {
    const { name, parent_id } = req.body;
    // validate category name and parent_id

    const saveObject = { name, image_url: '' };
    if (parent_id) {
      const parent = await Category.findById(parent_id);
      if (!parent) {
        return res.status(400).json({ status: false, message: "Parent category does not exist." });
      }
      saveObject.parent = parent;
    }
    const category = await Category.create({ ...saveObject }).lean();
    return res.status(200).json({ status: true, category, message: "Category has been added." })
  } catch (e) {
    return handleServerError(res, controller);
  }
}

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
  addCategory,
  getCategories,
  getSubCategories,
}