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

  // Create New Review or Update the review

  createProductReview: tryCatchError(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
    console.log({ rating, comment, productId });
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString())
          (rev.rating = rating), (rev.comment = comment);
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }

    let avg = 0;
    product.ratings = product.reviews.forEach((rev) => {
      avg += rev.rating;
    });
    product.rating = avg / product.reviews.length;

    await product.save({ validatorBeforeSave: false });

    res.status(200).json({
      success: true,
    });
  }),
};

module.exports = ProductController;
