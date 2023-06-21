const Guarantee = require("../models/guaranteeModel");

const ErrorHander = require("../utils/errorhander");
const catchAsynError = require("../middleware/catchAsynError");
const ApiFeatures = require("../utils/apifeatures");


const GenerrateRandomString = (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ_xXx_Tue_Dep_Trai_Vjp_Pro_xXx_abcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};


//admin
exports.createGuarantee = catchAsynError(async (req, res, next) => {

  console.log('Guarantee controller')
  const {orderItems} = req.body;
  console.log(orderItems);

  for (let i = 0; i < orderItems.length; i++) {
    const code=GenerrateRandomString(7);
    const guaranteen = await Guarantee.create({product:orderItems[i].product,code:code,user:req.user,description:"Mã bảo hành sản phẩm là "+code,expireDate:new Date().getDate()+60});
    orderItems[i].guaranteen=guaranteen;
    console.log(guaranteen)
  }

next();
});

exports.getAllGuarantees = catchAsynError(async (req, res) => {
  console.log("access");
  const resultPerPage = 8;
  const guaranteesCount = await Guarantee.countDocuments();

  const apiFeature = new ApiFeatures(Guarantee.find(), req.query)
    .search()
    .filter();

  let guarantees = await apiFeature.query.clone();

  let filteredGuaranteesCount = guarantees.length;

  apiFeature.pagination(resultPerPage);

  // guarantees = await apiFeature.query;

  //   console.log(guarantees);
  //   console.log(guaranteesCount);
  //   console.log(resultPerPage);
  //   console.log(filteredGuaranteesCount);

  res.status(200).json({
    success: true,
    guarantees,
    guaranteesCount,
    resultPerPage,
    filteredGuaranteesCount,
  });
});
//admim
exports.getAdminGuarantees = catchAsynError(async (req, res, next) => {
  const guarantees = await Guarantee.find();

  res.status(200).json({
    success: true,
    guarantees,
  });
});
//admin
exports.updateGuarantee = catchAsynError(async (req, res, next) => {
  let guarantee = await Guarantee.findById(req.params.id);

  if (!guarantee) {
    return next(new ErrorHander("Không tìm thấy mã bảo hành", 404));
  }

  guarantee = await Guarantee.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    guarantee,
  });
});

//admim
exports.deleteGuarantees = catchAsynError(async (req, res, next) => {
  const guarantee = await Guarantee.findById(req.params.id);
  if (!guarantee) {
    return next(new ErrorHander("Không tìm thấy mã bảo hành", 404));
  }

  await guarantee.remove();
  res.status(200).json({
    success: true,
    message: "XÓa mã bảo hành thành công",
  });
});

exports.getGuaranteeDetails = catchAsynError(async (req, res, next) => {
  const guarantee = await Guarantee.findById(req.params.id);
  if (!guarantee) {
    return next(new ErrorHander("Không tìm thấy mã bảo hành", 404));
  }
  res.status(200).json({
    success: true,
    guarantee,
  });
});
