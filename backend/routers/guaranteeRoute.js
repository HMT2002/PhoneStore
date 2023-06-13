const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authorieRoles } = require("../middleware/auth");

const guaranteeController = require("../controllers/guaranteeController");

router.route("/guarantees").get(guaranteeController.getAllGuarantees);
router
  .route("/admin/guarantees")
  .get(
    isAuthenticatedUser,
    authorieRoles("admin"),
    guaranteeController.getAdminGuarantees
  );
router.route("/guarantee/:id").get(guaranteeController.getGuaranteeDetails);

router
  .route("/admin/new")
  .post(
    isAuthenticatedUser,
    authorieRoles("admin"),
    guaranteeController.createGuarantee
  );
router
  .route("/admin/:id")
  .put(
    isAuthenticatedUser,
    authorieRoles("admin"),
    guaranteeController.updateGuarantee
  );
router
  .route("/admin/:id")
  .delete(
    isAuthenticatedUser,
    authorieRoles("admin"),
    guaranteeController.deleteGuarantees
  );

module.exports = router;
