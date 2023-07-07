import React, {Fragment, useEffect, useState} from 'react';
import './OrderDetails.css';
import {useSelector, useDispatch} from 'react-redux';
import MetaData from '../layout/MetaData';
import {Link} from 'react-router-dom';
import {Button, Typography} from '@material-ui/core';
import {getOrderDetails, clearErrors} from '../../actions/orderActions';
import Loader from '../layout/Loader/Loader';
import {useAlert} from 'react-alert';
import EditIcon from '@material-ui/icons/Edit';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import { format, getDate } from "date-fns";

const OrderDetails = ({match}) => {
  const {order, error, loading} = useSelector(state => state.orderDetails);
  const dispatch = useDispatch();
  const alert = useAlert();

  const [showModal, setShowModal] = useState(false);
  const [guatantee, setGuarantee] = useState({expireDate:new Date()});

  const showGuarantees = guarantee => {
    setGuarantee(guarantee);
    setShowModal(true);
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getOrderDetails(match.params.id));
  }, [dispatch, alert, error, match.params.id]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Chi tiết đơn hàng" />
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">Chi tiết các đơn hàng</Typography>
              <Typography>Thông tin vận chuyển</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Tên:</p>
                  <span>{order.user && order.user.name}</span>
                </div>
                <div>
                  <p>Số điện thoại:</p>
                  <span>
                    {order.shippingInfo && order.shippingInfo.phoneNo}
                  </span>
                </div>
                <div>
                  <p>Địa chỉ:</p>
                  <span>
                    {order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                  </span>
                </div>
              </div>
              <Typography>Thanh toán</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.paymentInfo &&
                      order.paymentInfo.status === 'succeeded'
                        ? 'greenColor'
                        : 'redColor'
                    }>
                    {order.paymentInfo &&
                    order.paymentInfo.status === 'succeeded'
                      ? 'Đã thanh toán'
                      : 'Chưa thanh toán'}
                  </p>
                </div>

                <div>
                  <p>Tổng tiền:</p>
                  <span>
                    {Math.round(order.totalPrice) &&
                      Math.round(order.totalPrice)}
                    $
                  </span>
                </div>
              </div>

              <Typography>Trạng thái đơn hàng</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === 'Đã giao'
                        ? 'greenColor'
                        : 'redColor'
                    }>
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <Typography>Các sản phẩm:</Typography>
              <div className="orderDetailsCartItemsContainer">
                {order.orderItems &&
                  order.orderItems.map(item => (
                    <div key={item.product}>
                      <img src={item.image} alt="Product" />
                      <Link to={`/product/${item.product}`}>
                        {item.name}
                      </Link>{' '}
                      <span>
                        {item.quantity} x {Math.round(item.price)}$ ={' '}
                        <b>{Math.round(item.price) * item.quantity}$</b>
                      </span>
                      <Button
                        onClick={() => {
                          showGuarantees(item.guaranteen);
                        }}>
                        <LibraryBooksIcon />
                      </Button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Fragment>
      )}
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Mã bảo hành</h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div>{guatantee.description}</div>
                  <div>Ngày hết hạn bảo hành: { format(new Date( guatantee.expireDate), "dd-MM-yyyy").toString()}</div>
                  {/* <div>
                    {new Date(guatantee.createDate).toString()}
                  </div> */}
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </Fragment>
  );
};

export default OrderDetails;
