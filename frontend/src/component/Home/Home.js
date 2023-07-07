import React, {Fragment, useEffect} from 'react';
import {CgMouse} from 'react-icons/cg';
import './Home.css';
import MetaData from '../layout/MetaData';
import ProductCard from './ProductCard';
import {getProduct, clearErrors} from '../../actions/productAction';
import {useSelector, useDispatch} from 'react-redux';
import Loader from '../layout/Loader/Loader';
import {useAlert} from 'react-alert';

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const {products, loading, error} = useSelector(state => state.products);
  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    dispatch(getProduct(), clearErrors());
  }, [dispatch, error, alert]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="MOBILE STORE" />
          <div className="banner">
            <p className="text-xl lg:text-3xl font-bold">
              CHÀO MỪNG QUÝ KHÁCH ĐÃ ĐẾN VỚI
              <span className="text-3xl lg:text-5xl block mt-3">
                MOBILE STORE
              </span>
            </p>
            <h1 className="mx-12 lg:mx-0 mt-10">
              HÃY TÌM SẢN PHẨM YÊU THÍCH CỦA QUÝ KHÁCH Ở BÊN DƯỚI
            </h1>

            <a href="#container" className="mt-10">
              <button className="bg-white px-4 py-3 flex items-center gap-2 text-gray-600 font-bold border-white border-2 hover:text-white hover:bg-transparent transition-all">
                Sản phẩm <CgMouse />
              </button>
            </a>
          </div>
          <h2 className="homeHeading text-lg lg:text-xl">
            Những sản phẩm của chúng tôi
          </h2>
          <div className="container flex" id="container">
            {products &&
              products.map(product => (
                <ProductCard
                  product={product}
                  className="w-full md:w-1/2 lg:w-1/3"
                />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
export default Home;
