import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./OrderSuccess.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
    return (
        <div className="orderSuccess">
            <CheckCircleIcon />

            <Typography>Đơn hàng của bạn đã được đặt thành công </Typography>
            <Link to="/orders">Xem đơn hàng</Link>
        </div>
    );
};

export default OrderSuccess;