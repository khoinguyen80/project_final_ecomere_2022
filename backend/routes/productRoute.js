const express = require("express");
const ProductController = require("../controllers/productController");

const router = express.Router();

router.route("/products").get(ProductController.getAllProducts);

router.route("/product/new").post(ProductController.createProduct);

router
  .route("/product/:id")
  .put(ProductController.updateProduct)
  .delete(ProductController.deleteProduct)
  .get(ProductController.getProductDetails);

module.exports = router;
