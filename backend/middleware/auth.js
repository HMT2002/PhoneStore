const { userInfo } = require("os");
const ErrorHander = require("../utils/errorhander");
const catchAsynError = require("./catchAsynError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsynError(async (req, res, next) => {
  let token;
  console.log('jump 1');
  // console.log(req.cookies);
  // console.log(req.headers);

  if (req.cookies) {
    token = req.cookies.token;
  } else {
          token = req.headers.token;

  }
  if (!token) {
    return next(new ErrorHander("Vui lòng đăng nhập để truy cập!"), 401);
  }
  console.log('this is token');
  console.log(token);
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedData.id);
  next();
});
exports.authorieRoles = (...roles) => {
  console.log('jump 2');

  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHander(`Role: ${req.user.role} không được phép truy cập! `),
        403
      );
    }
    next();
  };
};
