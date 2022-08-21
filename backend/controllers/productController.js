const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const tryCatchError = require("../middleware/tryCatchErrors");
const ApiFeatures = require("../utils/apifeatures");

// Create Product  -- Admin
const ProductController = {
  createProduct: tryCatchError(async (req, res, next) => {
    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      product,
    });
  }),

  // Get All Product
  getAllProducts: tryCatchError(async (req, res) => {
    const resultPerPage = 5;
    const productCount = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerPage);
    const products = await apiFeature.query;

    res.status(200).json({
      success: true,
      products,
      productCount,
    });
  }),

  // Get Product Details
  getProductDetails: tryCatchError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHander("Product not found", 404));
    }
    res.status(200).json({
      success: true,
      product,
    });
  }),

  // Update Product -- Admin

  updateProduct: tryCatchError(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHander("Product not found", 404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      product,
    });
  }),

  // Delete Product
  deleteProduct: tryCatchError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHander("Product not found", 404));
    }
    await product.remove();

    res.status(200).json({
      success: true,
      message: "Product Delete Successfully",
    });
  }),
};
module.exports = ProductController;
