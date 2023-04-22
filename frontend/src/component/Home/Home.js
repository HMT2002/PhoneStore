import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css"
import MetaData from "../layout/MetaData";
import ProductCard from "./ProductCard";
import { getProduct, clearErrors } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

const Home = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);
    useEffect(() => {
        if (error) {
            alert.error(error);
        }
        dispatch(getProduct(), clearErrors());
    }, [dispatch, error, alert]);
    return (
        <Fragment>
            {loading ? (<Loader />) : (<Fragment>
                <MetaData title="MOBILE STORE" />
                <div className="banner">
                    <p>CHÀO MỪNG QUÝ KHÁCH ĐÃ ĐẾN VỚI MOBILE STORE</p>
                    <h1>HÃY TÌM SẢN PHẨM YÊU THÍCH CỦA QUÝ KHÁCH Ở BÊN DƯỚI</h1>

                    <a href="#container">
                        <button>
                            Sản phẩm <CgMouse />
                        </button>

                    </a>
                </div>
                <h2 className="homeHeading"> Những sản phẩm của chúng tôi</h2>
                <div className="container" id="container">
                    {products && products.map(product => (<ProductCard product={product} />))}
                </div>
            </Fragment>)}
        </Fragment>
    );
}
export default Home;