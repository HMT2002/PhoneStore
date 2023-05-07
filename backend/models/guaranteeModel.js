const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const guaranteenSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, "Guaranteen required"],
    unique: true,
  },

  createDate: { type: Date, default: Date.now(), required: false },
  expireDate: { type: Date, default: null, required: false },

  description: {
    type: String,
    required: false,
    default: "There is no description",
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    default: null,
    required: [true, "Guaranteen required product"],
  },
});

guaranteenSchema.pre("save", async function (next) {
  // Only run this function if password actually modified
  if (!this.isModified("createDate")) {
    return next();
  }

  next();
});

guaranteenSchema.pre("save", async function (next) {
  // Only run this function if password actually modified
  if (!this.isModified("createDate") || this.isNew) {
    return next();
  }
  next();
});

const Guaranteen = mongoose.model("Guaranteen", guaranteenSchema);

module.exports = Guaranteen;
