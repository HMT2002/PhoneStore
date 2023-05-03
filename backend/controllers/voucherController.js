const Voucher = require("../models/voucherModel");
const VoucherCategory = require("../models/voucherCategoryModel");
const ErrorHander = require("../utils/errorhander");
const catchAsynError = require("../middleware/catchAsynError");
const ApiFeatures = require("../utils/apifeatures");

//admin
exports.createVoucher = catchAsynError(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const voucher = await Voucher.create(req.body);

  res.status(201).json({
    success: true,
    voucher,
  });
});

exports.createVoucherCategory = catchAsynError(async (req, res, next) => {
  const voucherCategory = await VoucherCategory.create(req.body);

  res.status(201).json({
    success: true,
    voucherCategory,
  });
});
exports.getAllVouchers = catchAsynError(async (req, res) => {
  console.log("access");
  const resultPerPage = 8;
  const vouchersCount = await Voucher.countDocuments();

  const apiFeature = new ApiFeatures(Voucher.find(), req.query)
    .search()
    .filter();

  let vouchers = await apiFeature.query.clone();

  let filteredVouchersCount = vouchers.length;

  apiFeature.pagination(resultPerPage);

  // vouchers = await apiFeature.query;

  //   console.log(vouchers);
  //   console.log(vouchersCount);
  //   console.log(resultPerPage);
  //   console.log(filteredVouchersCount);

  res.status(200).json({
    success: true,
    vouchers,
    vouchersCount,
    resultPerPage,
    filteredVouchersCount,
  });
});
//admim
exports.getAdminVouchers = catchAsynError(async (req, res, next) => {
  const vouchers = await Voucher.find();

  res.status(200).json({
    success: true,
    vouchers,
  });
});
//admin
exports.updateVoucher = catchAsynError(async (req, res, next) => {
  let voucher = await Voucher.findById(req.params.id);

  if (!voucher) {
    return next(new ErrorHander("Không tìm thấy giảm giá", 404));
  }

  voucher = await Voucher.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    voucher,
  });
});

//admim
exports.deleteVouchers = catchAsynError(async (req, res, next) => {
  const voucher = await Voucher.findById(req.params.id);
  if (!voucher) {
    return next(new ErrorHander("Không tìm thấy giảm giá", 404));
  }

  await voucher.remove();
  res.status(200).json({
    success: true,
    message: "XÓa giảm giá thành công",
  });
});

exports.updateVoucherCategory = catchAsynError(async (req, res, next) => {
  let voucher = await VoucherCategory.findById(req.params.id);

  if (!voucher) {
    return next(new ErrorHander("Không tìm thấy giảm giá", 404));
  }

  voucher = await Voucher.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    voucher,
  });
});

//admim
exports.deleteVouchersCategory = catchAsynError(async (req, res, next) => {
  const voucher = await VoucherCategory.findById(req.params.id);
  if (!voucher) {
    return next(new ErrorHander("Không tìm thấy giảm giá", 404));
  }

  await voucher.remove();
  res.status(200).json({
    success: true,
    message: "XÓa giảm giá thành công",
  });
});

exports.getVoucherDetails = catchAsynError(async (req, res, next) => {
  const voucher = await Voucher.findById(req.params.id);
  if (!voucher) {
    return next(new ErrorHander("Không tìm thấy sản phẩm", 404));
  }
  res.status(200).json({
    success: true,
    voucher,
  });
});
exports.createVoucherReview = catchAsynError(async (req, res, next) => {
  const { rating, comment, voucherId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const voucher = await Voucher.findById(voucherId);

  const isReviewed = voucher.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );
  if (isReviewed) {
    voucher.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    voucher.reviews.push(review);
    voucher.numOfReviews = voucher.reviews.length;
  }
  let avg = 0;
  voucher.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  voucher.ratings = avg / voucher.reviews.length;
  await voucher.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});
exports.getVoucherReviews = catchAsynError(async (req, res, next) => {
  const voucher = await Voucher.findById(req.query.id);

  if (!voucher) {
    return next(new ErrorHander("Không tìm thấy sản phẩm", 404));
  }

  res.status(200).json({
    success: true,
    reviews: voucher.reviews,
  });
});
exports.deleteReview = catchAsynError(async (req, res, next) => {
  const voucher = await Voucher.findById(req.query.voucherId);
  if (!voucher) {
    return next(new ErrorHander("Không tìm thấy sản phẩm", 404));
  }
  const reviews = voucher.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );
  let avg = 0;
  reviews.forEach((rev) => {
    avg += rev.rating;
  });
  let ratings = 0;
  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }
  const numOfReviews = reviews.length;

  await Voucher.findByIdAndUpdate(
    req.query.voucherId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
  });
});
