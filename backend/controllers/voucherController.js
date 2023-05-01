const Voucher = require("../models/voucherModel");
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

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "Vouchers",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const voucher = await Voucher.create(req.body);

  res.status(201).json({
    success: true,
    voucher,
  });
});
exports.getAllVouchers = catchAsynError(async (req, res) => {
  console.log("access");
  const resultPerPage = 8;
  const productsCount = await Voucher.countDocuments();

  const apiFeature = new ApiFeatures(Voucher.find(), req.query)
    .search()
    .filter();

  // let products = await apiFeature.query.clone();

  let products = await Voucher.find({});

  let filteredVouchersCount = products.length;

  apiFeature.pagination(resultPerPage);

  // products = await apiFeature.query;

  // products = await apiFeature.query;

  console.log(products);
  console.log(productsCount);
  console.log(resultPerPage);
  console.log(filteredVouchersCount);

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredVouchersCount,
  });
});
//admim
exports.getAdminVouchers = catchAsynError(async (req, res, next) => {
  const products = await Voucher.find();

  res.status(200).json({
    success: true,
    products,
  });
});
//admin
exports.updateVoucher = catchAsynError(async (req, res, next) => {
  let product = await Voucher.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Không tìm thấy sản phẩm", 404));
  }
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  product = await Voucher.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

//admim
exports.deleteVouchers = catchAsynError(async (req, res, next) => {
  const product = await Voucher.findById(req.params.id);
  if (!product) {
    return next(new ErrorHander("Không tìm thấy sản phẩm", 404));
  }
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }
  await product.remove();
  res.status(200).json({
    success: true,
    message: "XÓa sản phẩm thành công",
  });
});
exports.getVoucherDetails = catchAsynError(async (req, res, next) => {
  const product = await Voucher.findById(req.params.id);
  if (!product) {
    return next(new ErrorHander("Không tìm thấy sản phẩm", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});
exports.createVoucherReview = catchAsynError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Voucher.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );
  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  product.ratings = avg / product.reviews.length;
  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});
exports.getVoucherReviews = catchAsynError(async (req, res, next) => {
  const product = await Voucher.findById(req.query.id);

  if (!product) {
    return next(new ErrorHander("Không tìm thấy sản phẩm", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});
exports.deleteReview = catchAsynError(async (req, res, next) => {
  const product = await Voucher.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHander("Không tìm thấy sản phẩm", 404));
  }
  const reviews = product.reviews.filter(
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
    req.query.productId,
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
