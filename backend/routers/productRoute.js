const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authorieRoles } = require("../middleware/auth");
const {
  getAllProducts,
  getAdminProducts,
  createProduct,
  updateProduct,
  deleteProducts,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
} = require("../controllers/productController");

const guaranteeController=require("../controllers/guaranteeController");
const voucherController = require("../controllers/voucherController");

router.route("/products").get(getAllProducts);
router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorieRoles("admin"), getAdminProducts);
router.route("/product/:id").get(voucherController.getProductVoucherDetails,getProductDetails);
router.route("/product/:id/voucher").get(voucherController.getProductVoucherDetails);

router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorieRoles("admin"),voucherController.createVoucher, createProduct);
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorieRoles("admin"), updateProduct);
router
  .route("/admin/product/:id")
  .delete(isAuthenticatedUser, authorieRoles("admin"), deleteProducts);

router.route("/review").put(isAuthenticatedUser, createProductReview);
router.route("/reviews").get(getProductReviews);
router.route("/reviews").delete(isAuthenticatedUser, deleteReview);

module.exports = router;
