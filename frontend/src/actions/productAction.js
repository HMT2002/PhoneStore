import axios from 'axios';

import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  CLEAR_ERRORS,
  NEW_VOUCHER_REQUEST ,
  NEW_VOUCHER_SUCCESS ,
  NEW_VOUCHER_RESET,
  NEW_VOUCHER_FAIL ,
  PRODUCT_VOUCHER_DETAILS_REQUEST,
  PRODUCT_VOUCHER_DETAILS_SUCCESS,
  PRODUCT_VOUCHER_DETAILS_FAIL,
  DELETE_VOUCHER_REQUEST ,
  DELETE_VOUCHER_SUCCESS ,
  DELETE_VOUCHER_RESET,
  DELETE_VOUCHER_FAIL,
} from '../constants/productConstants';

export const getProduct = (keyword = "", currentPage = 1, price = [0, 100000], category) => async (dispatch) => {
  try {
      dispatch({ type: ALL_PRODUCT_REQUEST });

      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&voucherPrice[gte]=${price[0]}&voucherPrice[lte]=${price[1]}`;
      if (category) {
          link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&voucherPrice[gte]=${price[0]}&voucherPrice[lte]=${price[1]}&category=${category}`;
      }
      var { data } = await axios.get(link);

      data.products.map(product=>{
        product.voucherPrice=Math.round( (product.price*1)*(1-(product.voucher.value*1/100)))
      })
      // var reduced = data.products.reduce(function(filtered, product) {
      //   if ((product.voucherPrice<=price[0])&&(product.voucherPrice>=price[1])) {
      //      filtered.push(product);
      //   }
      //   return filtered;
      // }, []);
      // console.log(reduced.length)
      console.log(data)


      dispatch({
          type: ALL_PRODUCT_SUCCESS,
          payload: data,
      });
  } catch (error) {
      dispatch({
          type: ALL_PRODUCT_FAIL,
          payload: error.response.data.message,
      });
  }
};
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    var { data } = await axios.get(`/api/v1/product/${id}`);

    data.product.voucherPrice=Math.round( (data.product.price*1)*(1-(data.product.voucher.value*1/100)))

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getProductVoucherDetails = async (id) => {
  console.log('ewqrewrqewrewqrqwrqwerqwr');
  try {
    const { data } = await axios.get(`/api/v1/product/${id}/voucher`);
    console.log(data);
    return data;
  } catch (error) {
console.log(error);
return error;
  }
};
export const getAdminProduct = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_REQUEST });
    const { data } = await axios.get('/api/v1/admin/products');
    dispatch({
      type: ADMIN_PRODUCT_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });

    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    const { data } = await axios.post(
      `/api/v1/admin/product/new`,
      productData,
      config
    );

    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const createVoucher = (voucherData,id) => async (dispatch) => {
  try {
    dispatch({ type: NEW_VOUCHER_REQUEST });


    const config = {
      headers: { 'Content-Type': 'application/json' },
    };
    console.log(id)
    console.log(voucherData)

    const { data } = await axios.put(
      '/api/v1/admin/voucher/'+id,
      voucherData,
      config
    );

    dispatch({
      type: NEW_VOUCHER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_VOUCHER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteVoucher = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_VOUCHER_REQUEST });

    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    const { data } = await axios.delete(
      '/api/v1/admin/voucher/'+id,
      config
    );

    dispatch({
      type: DELETE_VOUCHER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_VOUCHER_FAIL,
      payload: error.response.data.message,
    });
  }
};


export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    const { data } = await axios.put(`/api/v1/review`, reviewData, config);

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/product/${id}`);

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    const { data } = await axios.put(
      `/api/v1/admin/product/${id}`,
      productData,
      config
    );

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const getAllReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_REVIEW_REQUEST });

    const { data } = await axios.get(`/api/v1/reviews?id=${id}`);

    dispatch({
      type: ALL_REVIEW_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: ALL_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const deleteReviews = (reviewId, productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    const { data } = await axios.delete(
      `/api/v1/reviews?id=${reviewId}&productId=${productId}`
    );

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
