const express = require("express");
const {
  getAllProductsControlers,
  createProduct,
} = require("../controllers/productController");

const router = express.Router();

router.route("/products").get(getAllProductsControlers);

router.route("/product/new").post(createProduct);

module.exports = router;
