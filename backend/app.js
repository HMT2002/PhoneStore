const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config({ path: "backend/config/config.env" });

const errorMiddleware = require("./middleware/error");
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

const product = require("./routers/productRoute");
const user = require("./routers/userRoute");
const order = require("./routers/orderRoute");
const payment = require("./routers/paymentRoute");
const voucher = require("./routers/voucherRoute");
const guarantee = require("./routers/guaranteeRoute");

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    console.log(req.requestTime);
    console.log(req.originalUrl);
  
    next();
  });
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);
app.use("/api/v1", voucher);
app.use("/api/v1", guarantee);

//Middleware for Error
app.use(errorMiddleware);

module.exports = app;
