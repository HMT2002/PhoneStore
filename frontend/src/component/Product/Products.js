import React, {Fragment, useEffect, useState} from 'react';
import './Products.css';
import {useSelector, useDispatch} from 'react-redux';
import {getProduct, clearErrors} from '../../actions/productAction';
import Loader from '../layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import Pagination from 'react-js-pagination';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import {useAlert} from 'react-alert';
import MetaData from '../layout/MetaData';
const categories = [
  'Apple',
  'Samsung',
  'Xiaomi',
  'Realme',
  'Oppo',
  'Vivo',
  'Asus',
];

const Products = ({match}) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [upperPrice, setUpperPrice] = useState(0);
  const [downerPrice, setDownerPrice] = useState(0);

  const [category, setCategory] = useState('');

  const setCurrentPageNo = e => {
    setCurrentPage(e);
  };

  const priceHandler = newPrice => {
    setPrice(newPrice);
  };

  const {
    products,
    loading,
    resultPerPage,
    productsCount,
    filteredProductsCount,
    error,
  } = useSelector(state => state.products);
  const keyword = match.params.keyword;
  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    dispatch(getProduct(), clearErrors());
    dispatch(getProduct(keyword, currentPage, price, category));
  }, [dispatch, keyword, currentPage, price, category, alert, error]);

  let count = filteredProductsCount;
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Sản Phẩm-MOBILE STORE" />
          <h2 className="productsHeading">Sản phẩm</h2>
          <div className="products">
            {products &&
              products.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
          <div className="filterBox">
            <Typography>Giá</Typography>
            {/* <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            /> */}

              <div class="priceRange" onClick={()=>{ priceHandler([0, 9999])}}>
                <div class="selectPriceRange">Below 10000</div>
              </div>
              <div class="priceRange" onClick={()=>{priceHandler([10000, 30000])} }>
                <div class="selectPriceRange">10000 -&gt; 30000</div>
              </div>
              <div class="priceRange" onClick={()=>{priceHandler([30001, 50000])} }>
                <div class="selectPriceRange">30001 -&gt; 50000</div>
              </div>
              <div class="priceRange" onClick={()=>{ priceHandler([50001, 100000])}}>
                <div class="selectPriceRange">Above 500000</div>
              </div>
            <div class="price-small-text">Chọn khoảng giá</div>
            <div class="inputPriceRangeHolder">
              <input pattern="[0-9]*" placeholder="From" class="inputPriceRange" onChange={(e)=>{ setDownerPrice(prevState=>{return e.target.value})}}/>
              <span>-</span>
              <input pattern="[0-9]*" placeholder="to" class="inputPriceRange" onChange={(e)=>{setUpperPrice(prevState=>{return e.target.value})}}/>
            </div>
            <button className='applyInputPriceRange' onClick={()=>{priceHandler([downerPrice,upperPrice])}}>
              Áp dụng
            </button>

            <Typography>Hãng</Typography>
            <ul className="categoryBox">
              {categories.map(category => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}>
                  {category}
                </li>
              ))}
            </ul>
          </div>

          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
