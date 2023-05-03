const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authorieRoles } = require("../middleware/auth");

const voucherController = require("../controllers/voucherController");

router.route("/vouchers").get(voucherController.getAllVouchers);
router
  .route("/admin/vouchers")
  .get(
    isAuthenticatedUser,
    authorieRoles("admin"),
    voucherController.getAdminVouchers
  );
router.route("/voucher/:id").get(voucherController.getVoucherDetails);

router
  .route("/admin/voucherCategory/new")
  .post(
    isAuthenticatedUser,
    authorieRoles("admin"),
    voucherController.createVoucherCategory
  );
router
  .route("/admin/voucherCategory/:id")
  .put(
    isAuthenticatedUser,
    authorieRoles("admin"),
    voucherController.updateVoucherCategory
  );
router
  .route("/admin/voucherCategory/:id")
  .delete(
    isAuthenticatedUser,
    authorieRoles("admin"),
    voucherController.deleteVouchersCategory
  );

router
  .route("/admin/voucher/new")
  .post(
    isAuthenticatedUser,
    authorieRoles("admin"),
    voucherController.createVoucher
  );
router
  .route("/admin/voucher/:id")
  .put(
    isAuthenticatedUser,
    authorieRoles("admin"),
    voucherController.updateVoucher
  );
router
  .route("/admin/voucher/:id")
  .delete(
    isAuthenticatedUser,
    authorieRoles("admin"),
    voucherController.deleteVouchers
  );

module.exports = router;
