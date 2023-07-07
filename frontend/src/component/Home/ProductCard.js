import React, {Fragment, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Rating} from '@material-ui/lab';
import {useSelector, useDispatch} from 'react-redux';

import VoucherLabel from './../Voucher/VoucherLabel';
import './ProductCard.css';

import {getProductVoucherDetails} from '../../actions/productAction';

const ProductCard = ({product}) => {
  const [voucher, setVoucher] = useState({value: 0});
  const [isVoucher, setIsVoucher] = useState(false);

  const getVoucherDetail = async () => {
    if (product.voucher.value * 1 === 0) {
      console.log('No Voucher');
      setIsVoucher(false);
    } else {
      setVoucher(product.voucher);
      setIsVoucher(true);
    }
  };

  const options = {
    size: 'large',
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  useEffect(async () => {
    await getVoucherDetail();
  }, []);

  return (
    <Link
      className="productCard w-full md:w-1/2 lg:w-1/3 text-center"
      to={`/product/${product._id}`}>
      <div className="">
        {isVoucher ? (
          <div className="voucherContainer-ProducCard">
            <VoucherLabel voucher={product.voucher} />
          </div>
        ) : null}

        <div className="w-full h-96">
          <img src={product.images[0].url} alt={product.name} />
        </div>
        <p className="text-lg font-bold line-clamp-1 mt-6">{product.name}</p>
        <div className="mb-4">
          <Rating {...options} />{' '}
          <span className="productCardSpan">
            ({product.numOfReviews} Bình luận)
          </span>
        </div>
        {isVoucher ? (
          <div>
            <span className="originalPrice text-xl">{`${Math.round(
              product.price * 1,
            )} $`}</span>
            <span className="discountPrice text-xl font-bold">{`${Math.round(
              product.voucherPrice * 1,
            )} $`}</span>
          </div>
        ) : (
          <span className="text-xl font-bold">{`${product.price} $`}</span>
        )}
      </div>
    </Link>
  );
};
export default ProductCard;
