import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";

const ProductCard = ({ product }) => {
  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p className="font-bold text-xl text-gray-700 mb-2 mt-3">
        {product.name}
      </p>
      <div className="">
        <Rating {...options} />{" "}
        <p className="productCardSpan text-xs">
          ({product.numOfReviews} Bình luận)
        </p>
      </div>
      <span className="font-bold text-xl text-gray-700">{`${product.price} $`}</span>
    </Link>
  );
};
export default ProductCard;
