import './VoucherLabel.css';
import React from 'react';


const VoucherLabel = ({ voucher }) => {

    return (
    <div className="voucherNumberContainer">-{voucher.value}%</div>
    );
};

export default VoucherLabel;