const express = require("express");
const ProductController = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/products").get(ProductController.getAllProducts);
router
  .route("/admin/products")
  .get(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    ProductController.getAdminProducts
  );
router
  .route("/admin/product/new")
  .post(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    ProductController.createProduct
  );

router
  .route("/admin/product/:id")
  .put(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    ProductController.updateProduct
  )
  .delete(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    ProductController.deleteProduct
  );

router.route("/product/:id").get(ProductController.getProductDetails);
router
  .route("/review")
  .put(isAuthenticatedUser, ProductController.createProductReview);

router
  .route("/reviews")
  .get(ProductController.getProductReviews)
  .delete(isAuthenticatedUser, ProductController.deleteReview);

module.exports = router;
