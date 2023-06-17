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
    const reqVoucher = await getProductVoucherDetails(product._id);
    console.log(reqVoucher);
    if (!reqVoucher.voucher) {
      console.log('No Voucher');
      setIsVoucher(false);
    } else {
      setVoucher(reqVoucher.voucher);
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
    <Link className="productCard" to={`/product/${product._id}`}>
        {isVoucher?(<div className="voucherContainer-ProducCard">
        <VoucherLabel voucher={voucher} />
      </div>):null}

      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <Rating {...options} />{' '}
        <span className="productCardSpan">
          ({product.numOfReviews} Bình luận)
        </span>
      </div>
      <span>{`${product.price} $`}</span>
    </Link>
  );
};
export default ProductCard;
