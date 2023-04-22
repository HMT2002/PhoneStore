import React, { Fragment } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import "./ConfirmOrder.css";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";

const ConfirmOrder = ({ history }) => {
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
    );

    const shippingCharges = subtotal > 1000 ? 0 : 200;

    const tax = subtotal * 0.18;

    const totalPrice = subtotal + tax + shippingCharges;

    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

    const proceedToPayment = () => {
        const data = {
            subtotal,
            shippingCharges,
            tax,
            totalPrice,
        };

        sessionStorage.setItem("orderInfo", JSON.stringify(data));

        history.push("/process/payment");
    };

    return (
        <Fragment>
            <MetaData title="Confirm Order" />
            <CheckoutSteps activeStep={1} />
            <div className="confirmOrderPage">
                <div>
                    <div className="confirmshippingArea">
                        <Typography>Thông tin vận chuyển</Typography>
                        <div className="confirmshippingAreaBox">
                            <div>
                                <p>Tên:</p>
                                <span>{user.name}</span>
                            </div>
                            <div>
                                <p>Số điện thoại:</p>
                                <span>{shippingInfo.phoneNo}</span>
                            </div>
                            <div>
                                <p>Địa chỉ:</p>
                                <span>{address}</span>
                            </div>
                        </div>
                    </div>
                    <div className="confirmCartItems">
                        <Typography>Giỏ hàng của bạn:</Typography>
                        <div className="confirmCartItemsContainer">
                            {cartItems &&
                                cartItems.map((item) => (
                                    <div key={item.product}>
                                        <img src={item.image} alt="Product" />
                                        <Link to={`/product/${item.product}`}>
                                            {item.name}
                                        </Link>{" "}
                                        <span>
                                            {item.quantity} x {item.price}$ ={" "}
                                            <b>{item.price * item.quantity}$</b>
                                        </span>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
                {/*  */}
                <div>
                    <div className="orderSummary">
                        <Typography>Tóm tắt đơn hàng</Typography>
                        <div>
                            <div>
                                <p>Tổng tiền:</p>
                                <span>{subtotal}$</span>
                            </div>
                            <div>
                                <p>Phí vận chuyển:</p>
                                <span>{shippingCharges}$</span>
                            </div>
                            <div>
                                <p>Thuế GTA:</p>
                                <span>{tax}$</span>
                            </div>
                        </div>

                        <div className="orderSummaryTotal">
                            <p>
                                <b>Tổng:</b>
                            </p>
                            <span>{totalPrice}$</span>
                        </div>

                        <button onClick={proceedToPayment}>Chấp nhận thanh toán</button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default ConfirmOrder;