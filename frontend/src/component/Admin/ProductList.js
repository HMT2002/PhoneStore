import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getAdminProduct, deleteProduct,createVoucher } from "../../actions/productAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Label from "@material-ui/icons/Label";
import DescriptionIcon from "@material-ui/icons/Description";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { DatePicker ,MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';


import SideBar from "./Sidebar";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

const ProductList = ({ history }) => {


    const [showModal, setShowModal] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [images, setImages] = useState([]);
    const [discountProduct, setDiscountProduct] = useState('');


    const dispatch = useDispatch();

    const alert = useAlert();

    const { error, products } = useSelector((state) => state.products);

    const { error: deleteError, isDeleted } = useSelector((state) => state.product);

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));
    };



    const addDiscountProductHandler = (id) => {
        console.log(id);
        setDiscountProduct(id);

    };

    const createProductVoucherSubmitHandler = (e) => {
        e.preventDefault();
        console.log('h');
        console.log(discountProduct);
        const myForm = new FormData();

        myForm.set("code", '155648');
        myForm.set("expireDate", endDate);
        myForm.set("value", 48);
        myForm.set("amount", 15);
        myForm.set("product", discountProduct);

        images.forEach((image) => {
            myForm.append("images", image);
        });

        dispatch(createVoucher(myForm));

    };

    const showDiscountModal = (id) => {

        addDiscountProductHandler(id);
    };



    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            alert.success("Xóa sản phẩm thành công");
            history.push("/admin/dashboard");
            dispatch({ type: DELETE_PRODUCT_RESET });
        }

        dispatch(getAdminProduct());
    }, [dispatch, alert, error, deleteError, history, isDeleted]);

    const columns = [
        { field: "id", headerName: "ID sản phẩm", minWidth: 200, flex: 0.5 },

        {
            field: "name",
            headerName: "Tên sản phẩm",
            minWidth: 350,
            flex: 1,
        },
        {
            field: "stock",
            headerName: "Kho",
            type: "number",
            minWidth: 150,
            flex: 0.3,
        },

        {
            field: "price",
            headerName: "Giá",
            type: "number",
            minWidth: 270,
            flex: 0.5,
        },

        {
            field: "actions",
            flex: 0.3,
            headerName: "Chỉnh sửa",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
                            <EditIcon />
                        </Link>
                        <Button onClick={() => deleteProductHandler(params.getValue(params.id, "id"))}>
                            <DeleteIcon />
                        </Button>
                        <Button onClick={() => {
                            showDiscountModal(params.getValue(params.id, "id"));
                            setShowModal(true);
                    }}>
                            <Label/>
                        </Button>

                    </Fragment>
                );
            },
        },
    ];

    
    // const [rows,setRows] = useState([]);
    const rows=[];
    products &&
        products.forEach((item) => {
            rows.push({
                id: item._id,
                stock: item.Stock,
                price: item.price,
                name: item.name,
            });
        });

    return (
        <Fragment>
            <MetaData title={`Tất cả sản phẩm`} />
            <div className="dashboard">
                <SideBar />
                <div className="productListContainer">
                    <h1 id="productListHeading">Tất cả sản phẩm</h1>

                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className="productListTable"
                        autoHeight
                    />
                </div>
            </div>

            {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Discount
                  </h3>

                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">

                <form
                        className="createProductForm"
                        encType="multipart/form-data"
                        onSubmit={createProductVoucherSubmitHandler}
                    >
                        <h1>Thông tin voucher</h1>

                        <div>
                            <SpellcheckIcon />
                            <input
                                type="text"
                                placeholder="Mã giảm giá"
                                required
                            />
                        </div>
                        <div>
                            <AttachMoneyIcon />
                            <input
                                type="number"
                                placeholder="Tỉ lệ giảm giá"
                                required
                            />
                        </div>

                        <div>
                        <DescriptionIcon />

                            <textarea
                                placeholder="Thông tin giảm giá"
                                cols="30"
                                rows="1"
                            ></textarea>
                        </div>


<MuiPickersUtilsProvider utils={DateFnsUtils}>
    <div>

                            <DatePicker label="Start Date"
        inputVariant="outlined"
        value={startDate}  onChange={(date) => setStartDate(date)} />

</div>
<div>
                                <DatePicker label="End Date"
        inputVariant="outlined"
        value={endDate} onChange={(date) => setEndDate(date)} />
</div>

</MuiPickersUtilsProvider>




                        <div id="createProductFormFile">
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                multiple
                            />
                        </div>

                        <Button
                            id="createProductBtn"
                            type="submit"
                        >
                            Chỉnh sửa voucher
                        </Button>
                    </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
        </Fragment>
        
    );
};

export default ProductList;