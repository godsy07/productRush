const validateInput = require("../utils/joi/validate");
const { handleServerError } = require("../middleware/errorHandling");

const Category = require("../models/Category");
const { deleteFile } = require("../middleware/files");

const controller = "CategoryController";

const addCategory = async (req, res) => {
  let image_url = '';
  const image = req.file;
  if (image) {
    image_url = 'uploads/' + req.file.filename;
  }
  try {
    const { name, parent_id } = req.body;

    const { error_message } = validateInput("addCategorySchema", { name, parent_id })
    if (error_message) {
      deleteFile(image);
      return res.status(400).json({ status: false, message: error_message });
    }
    
    // check if this category is already present
    let category = await Category.findOne({ name })
    if (category) {
      deleteFile(image);
      return res.status(400).json({ status: false, message: "This category already exists." })
    }

    const saveObject = { name, image_url };
    if (parent_id) {
      const parent = await Category.findById(parent_id);
      if (!parent) {
        deleteFile(image);
        return res.status(400).json({ status: false, message: "Parent category does not exist." });
      }
      saveObject.parent = parent;
    }
    category = await Category.create(saveObject);

    return res.status(200).json({ status: true, category, message: "Category has been added." })
  } catch (e) {
    deleteFile(image);
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

const getParentCategories = async (req, res) => {
  try {
    const categories = await Category.find({ parent:{ $eq: null } });
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

const getCategoriesForProducts = async (req, res) => {
  try {
    const categories = await Category.find({ parent:{ $ne: null } });
    return res.status(200).json({ status: true, categories, message: "Categories have been fetched." })
  } catch (e) {
    return handleServerError(res, controller);
  }
}

module.exports = {
  addCategory,
  getCategories,
  getSubCategories,
  getParentCategories,
  getCategoriesForProducts,
}