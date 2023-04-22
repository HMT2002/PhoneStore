import React from "react";
import playStore from "../../../image/playstore.png";
import appStore from "../../../image/Appstore.png";
import "./Footer.css";

const Footer = () => {
    return (
        <footer id="footer">
            <div className="leftFooter">
                <h4>TẢI ỨNG DỤNG</h4>
                <p>Tải ứng dụng cho điện thoại Android and điện thoại IOS</p>
                <img src={playStore} alt="playstore" />
                <img src={appStore} alt="Appstore" />
            </div>

            <div className="midFooter">
                <h1>MOBLE STORE</h1>
                <p>Chất lượng sản phẩm là hàng đầu</p>

                <p>Copyrights 2022 &copy; ELON MUSK</p>
            </div>

            <div className="rightFooter">
                <h4>Thông tin liên lạc</h4>
                <a href="http://faceboo.com/fbnhuconcat">Facebook</a>
                <a href="http://faceboo.com/fbnhuconcat">Facebook</a>
                <a href="http://faceboo.com/fbnhuconcat">Facebook</a>
            </div>
        </footer>
    );
};

export default Footer;