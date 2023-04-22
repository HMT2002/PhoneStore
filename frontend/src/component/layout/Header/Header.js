import React from "react";
import { ReactNavbar } from "overlay-navbar"
import logo from "../../../image/logo.png";

const options = {

    logoWidth: "20vmax",
    logo,
    burgerColor: "rgba(0, 0, 0, 0.616)",
    burgerColorHover: " black",
    navColor1: "white",
    logoHoverSize: "10px",
    logoHoverColor: " rgba(0, 0, 0, 0.616)",
    link1Text: "Trang chủ",
    link2Text: "Sản phẩm",
    link3Text: "Liên hệ",
    link4Text: "Chi tiết",
    link1Url: "/",
    link2Url: "/products",
    link3Url: "/contact",
    link4Url: "/about",
    link1Size: "1.3vmax",
    link1Color: "rgba(0, 0, 0, 0.616)",
    nav1justifyContent: "flex-end",
    nav2justifyContent: "flex-end",
    nav3justifyContent: "flex-start",
    nav4justifyContent: "flex-start",
    link1ColorHover: "black",
    link1Margin: "1vmax",
    profileIconUrl: "/login",
    profileIconColor: "rgba(0, 0, 0, 0.616)",
    searchIconColor: "rgba(0, 0, 0, 0.616)",
    cartIconColor: "rgba(0, 0, 0, 0.616)",
    profileIconColorHover: "black",
    searchIconColorHover: "black",
    cartIconColorHover: "black",
    cartIconMargin: "1vmax",
};
const Header = () => {
    return (
        <ReactNavbar  {...options} />
    );
}
export default Header;