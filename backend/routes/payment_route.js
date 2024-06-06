const express = require("express");
const {processPayment,sendStripeApiKey,} = require("../controller/Payment_controller");
const router = express.Router();
const { isAuthtenticate } = require("../middleware/auth");

router.route("/payment/process").post(isAuthtenticate, processPayment);

router.route("/stripeapikey").get(isAuthtenticate, sendStripeApiKey);

module.exports = router;