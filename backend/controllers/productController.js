const Product = require('../models/productModel');
const ErrorHander = require('../utils/errorhander');
const catchAsynError = require('../middleware/catchAsynError');
const ApiFeatures = require('../utils/apifeatures');

const cloudinary = require('cloudinary');

const Voucher = require("../models/voucherModel");
const VoucherCategory = require("../models/voucherCategoryModel");
const VoucherStatus = require("../models/voucherStatusModel");


//admin
exports.createProduct = catchAsynError(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === 'string') {
    images.push(req.body.images);
  } else {
    images = req.body.images;
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
  req.body.user = req.user.id;

  const product = await Product.create(req.body);
  req.product=product;

  res.status(201).json({
    success: true,
    product,
  });

  // next();
});
exports.getAllProducts = catchAsynError(async (req, res) => {
  console.log('access123456');
  const resultPerPage = 8;
  const productsCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find().lean(), req.query)
    .search()
    .filter();

  // const products = await apiFeature.query;
  apiFeature.pagination(resultPerPage);

  let products = await Product.find().lean();

  let filteredProductsCount = 5;

  // let products = await apiFeature.query;

  products = await apiFeature.query;

  console.log(products);
  console.log(productsCount);
  console.log(resultPerPage);
  console.log(filteredProductsCount);

  
  // products.forEach(async (product) => {
  //   const voucher = await Voucher.findOne({product:product._id})
  //   if (voucher) {
  //     product.voucher=voucher;
  //   }
  // });

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  });
});
//admim
exports.getAdminProducts = catchAsynError(async (req, res, next) => {
  let products = await Product.find();
  // products= JSON.parse(JSON.stringify(products));
  await products.forEach(async (product) => {
    var voucher = await Voucher.findOne({product:product._id})
    if (voucher) {
      product=product.toObject();
      console.log('voucher exist')
      product.voucher=voucher;
    }
  });

  res.status(200).json({
    success: true,
    products,
  });
});
//admin
exports.updateProduct = catchAsynError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander('Không tìm thấy sản phẩm', 404));
  }
  let images = [];

  if (typeof req.body.images === 'string') {
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
        folder: 'products',
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
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
exports.deleteProducts = catchAsynError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHander('Không tìm thấy sản phẩm', 404));
  }
  // for (let i = 0; i < product.images.length; i++) {
  //   await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  // }
  await product.remove();
  res.status(200).json({
    success: true,
    message: 'XÓa sản phẩm thành công',
  });
});
exports.getProductDetails = catchAsynError(async (req, res, next) => {

  let product = await Product.findById(req.params.id);
  product=product.toObject();

  if (!product) {
    return next(new ErrorHander('Không tìm thấy sản phẩm', 404));
  }

  if(req.voucher){
    product.voucher=req.voucher;
  }

  res.status(200).json({
    success: true,
    product,
  });
});
exports.createProductReview = catchAsynError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

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
exports.getProductReviews = catchAsynError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHander('Không tìm thấy sản phẩm', 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});
exports.deleteReview = catchAsynError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHander('Không tìm thấy sản phẩm', 404));
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

  await Product.findByIdAndUpdate(
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
