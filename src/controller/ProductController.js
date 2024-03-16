const urlModule = require('url');

const { deleteFile } = require("../middleware/files");
const validateInput = require("../utils/joi/validate");
const { handleServerError } = require("../middleware/errorHandling");

const Review = require('../models/Review');
const Product = require("../models/Product");
const Category = require("../models/Category");
const ProductFilter = require("../models/ProductFilter");

const controller = "CategoryController";

const getPaginatedProducts = async (req, res) => {
  const query = urlModule.parse(req.url, true).query;
  let page_no = query.page_no ? Number(query.page_no) : 1;
  let pagination = {
    total_records: 0,
    current_page: page_no,
    total_pages: 1,
    next_page: null,
    prev_page: null
  }

  if (isNaN(page_no)) {
    return res.status(400).json({ status: false, data:[], pagination, message: 'Page number should be a number type' })
  }

  try {
    const ITEMS_PER_PAGE = query.limit ? Number(query.limit) : 10;
    const total_records = await Product.find().countDocuments();

    let next_page = null;
    let total_pages = Math.ceil(total_records / ITEMS_PER_PAGE);
    const viewed_records = (page_no - 1) * ITEMS_PER_PAGE;
    if (viewed_records + ITEMS_PER_PAGE < total_records) {
      next_page = page_no + 1;
    }

    if (page_no > total_pages) {
      return res.status(400).json({ status: false, data:[], pagination, message: 'Page number does not exist.' })
    }
    if (page_no < 0) page_no = 1;

    let pipeline = []
    const host = process.env.HOST?process.env.HOST:"http://localhost";
    const port = process.env.PORT?process.env.PORT:"5002";
    const server = `${host}:${port}`;

    pipeline = [
      ...pipeline,
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'category',
        }
      },
      { $unwind: '$category' },
      {
        $lookup: {
          from: 'categories',
          localField: 'category.parent',
          foreignField: '_id',
          as: 'category.parent',
        }
      },
      { $unwind: '$category.parent' },
      {
        $lookup: {
          from: 'category-filters',
          localField: 'category.categoryFilter',
          foreignField: '_id',
          as: 'category.categoryFilter',
        }
      },
      { $unwind: '$category.categoryFilter' },
      {
        $lookup: {
          from: 'users',
          localField: 'seller',
          foreignField: '_id',
          as: 'seller',
        }
      },
      { $unwind: '$seller' },
      {
        $lookup: {
          from: 'product-filters',
          localField: 'productFilter',
          foreignField: '_id',
          as: 'productFilter',
        }
      },
      {
        $addFields: {
          image_url: {
            $ifNull: [
              {
                $concat: [server, "$image_url"],
              },
              "",
            ],
          },
          'category.image_url': {
            $ifNull: [
              {
                $concat: [server, "$category.image_url"],
              },
              "",
            ],
          },
          'category.parent.image_url': {
            $ifNull: [
              {
                $concat: [server, "$category.parent.image_url"],
              },
              "",
            ],
          },
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          brand: 1,
          model: 1,
          image_url: 1,
          createdAt: 1,
          updatedAt: 1,
          'category._id': 1,
          'category.name': 1,
          'category.image_url': 1,
          'category.parent._id': 1,
          'category.parent.name': 1,
          'category.parent.image_url': 1,
          'category.categoryFilter._id': 1,
          'category.categoryFilter.filters': 1,
          'productFilter._id': 1,
          'productFilter.filter': 1,
          'productFilter.price': 1,
        }
      },
    ]

    if (ITEMS_PER_PAGE > 0) {
      pipeline.push({
        $skip: (page_no - 1) * ITEMS_PER_PAGE,
      });
      pipeline.push({
        $limit: ITEMS_PER_PAGE,
      });
    } else {
      pipeline.push({
        $skip: 0,
      });
    }

    const data = await Product.aggregate([ ...pipeline ])

    pagination = {
      ...pagination,
      total_records: total_records,
      next_page: next_page,
      total_pages: total_pages,
    }

    return res.status(200).json({ status: true, data, pagination, message: "Products have been fetched." })
  } catch (e) {
    return res.status(500).json({ status: false, data: [], pagination, message: 'Something went wrong in server' })
  }
}

const getMyProducts = async (req, res) => {
  try {
    const user = req.user;
    const products = await Product.find({ seller: user._id }).lean();
    return res.status(200).json({ status: true, products, message: "Products have been fetched." })
  } catch (e) {
    return handleServerError(res, controller);
  }
}

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

    let products = seller.products ? seller.products : [];
    products = [...products, product];
    seller.products = products;
    await seller.save();

    return res.status(200).json({ status: true, message: "Product has been added." })
  } catch (e) {
    deleteFile(image);
    return handleServerError(res, controller);
  }
}

const getProductReviews = async (req, res) => {
  const query = urlModule.parse(req.url, true).query;
  let page_no = query.page_no ? Number(query.page_no) : 1;
  let pagination = {
    total_records: 0,
    current_page: page_no,
    total_pages: 1,
    next_page: null,
    prev_page: null
  }

  if (isNaN(page_no)) {
    return res.status(400).json({ status: false, data:[], pagination, message: 'Page number should be a number type' })
  }
  if (page_no < 0) page_no = 1;

  try {
    const ITEMS_PER_PAGE = query.limit ? Number(query.limit) : 10;
    const total_records = await Review.find().countDocuments();

    let next_page = null;
    let total_pages = Math.ceil(total_records / ITEMS_PER_PAGE);
    const viewed_records = (page_no - 1) * ITEMS_PER_PAGE;
    if (viewed_records + ITEMS_PER_PAGE < total_records) {
      next_page = page_no + 1;
    }

    if (page_no > total_pages) {
      return res.status(400).json({ status: false, data:[], pagination, message: 'Page number does not exist.' })
    }


    const pipeline = []

    if (ITEMS_PER_PAGE > 0) {
      pipeline.push({
        $skip: (page_no - 1) * ITEMS_PER_PAGE,
      });
      pipeline.push({
        $limit: ITEMS_PER_PAGE,
      });
    } else {
      pipeline.push({
        $skip: 0,
      });
    }

    const data = await Review.aggregate([ ...pipeline ])

    pagination = {
      ...pagination,
      total_records: total_records,
      next_page: next_page,
      total_pages: total_pages,
    }

    return res.status(200).json({ status: true, data, pagination, message: "Product reviews have been fetched." })
  } catch (e) {
    return res.status(500).json({ status: false, data: [], pagination, message: 'Something went wrong in server' })
  }
}

const addProductReview = async (req, res) => {
  let image_url = '';
  const image = req.file;
  if (image) {
    image_url = 'uploads/' + req.file.filename;
  }
  try {
    const { rating, comment, product_id } = req.body;

    const { error_message } = validateInput("addProductReviewSchema", { rating, comment, product_id })
    if (error_message) {
      deleteFile(image);
      return res.status(400).json({ status: false, message: error_message });
    }

    const user = req.user;

    const product = await Product.findById(product_id);
    if (!product) {
      return res.status(400).json({ status: false, message: 'Product does not exist.' });
    }

    const review = await Review.findById({ user: user._id });
    if (review) {
      deleteFile(image);
      return res.status(400).json({ status: false, message: "You have already added a review." });
    }

    console.log("rating: ", rating)
    console.log("comment: ", comment)
    console.log("product_id: ", product_id)
    console.log("image: ", image)

    return res.status(200).json({ status: true, message: "Product review has been added." })
  } catch (e) {
    deleteFile(image);
    return handleServerError(res, controller);
  }
}

module.exports = {
  addProduct,
  getMyProducts,
  getPaginatedProducts,
  getProductReviews,
  addProductReview,
}
