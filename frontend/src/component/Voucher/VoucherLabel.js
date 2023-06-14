import React from "react";
import './VoucherLabel.css';

const VoucherLabel = ({ info }) => {


    return (
        <div className="voucherContainer">
            <div className="voucherNumberContainer"><span class="voucherNumber">42%</span></div>
        </div>
    );
};

export default VoucherLabel;