const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const voucherSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, "Voucher required"],
    unique: true,
  },

  voucherCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VoucherCategory",
    default: null,
    required:false,
  },

  voucherStatus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VoucherStatus",
    default: null,
    required: false,
  },

  createDate: { type: Date, default: Date.now(), required: false },
  expireDate: { type: Date, default: null, required: false },
  value: { type: Number, default: 0 },
  amount: { type: Number, default: 0 },
  description: {
    type: String,
    required: false,
    default: "There is no description",
  },

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "UserMaintaince",
    required:[true, "Voucher required user"],
  },
});

voucherSchema.pre("save", async function (next) {
  // Only run this function if password actually modified
  if (!this.isModified("createDate")) {
    return next();
  }

  next();
});

voucherSchema.pre("save", async function (next) {
  // Only run this function if password actually modified
  if (!this.isModified("createDate") || this.isNew) {
    return next();
  }
  next();
});

const Voucher = mongoose.model("Voucher", voucherSchema);

module.exports = Voucher;
