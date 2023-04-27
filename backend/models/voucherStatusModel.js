const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const voucherStatusSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Voucher required"],
    unique: true,
  },
  description: {
    type: String,
    required: false,
    default: "There is no description",
  },
});

voucherStatusSchema.pre("save", async function (next) {
  // Only run this function if password actually modified
  if (!this.isModified("createDate")) {
    return next();
  }

  next();
});

voucherStatusSchema.pre("save", async function (next) {
  // Only run this function if password actually modified
  if (this.isNew) {
    return next();
  }
  next();
});

const VoucherStatus = mongoose.model("Voucher", voucherStatusSchema);

module.exports = VoucherStatus;
