import './VoucherLabel.css';
import {useSelector, useDispatch} from 'react-redux';
import React, {Fragment, useEffect, useState} from 'react';


const VoucherLabel = ({ voucher }) => {

    console.log(voucher)
    return (
    <div className="voucherNumberContainer">-{voucher.value}%</div>
    );
};

export default VoucherLabel;