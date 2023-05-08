const express = require("express");
const {
    processPayment,
    sendStripeApiKey,
} = require("../controllers/paymentController");
const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");
const guaranteeController=require("../controllers/guaranteeController");

router.route("/payment/process").post(isAuthenticatedUser,guaranteeController.createGuarantee, processPayment);


router.route("/stripeapikey").get(isAuthenticatedUser, sendStripeApiKey);

module.exports = router;