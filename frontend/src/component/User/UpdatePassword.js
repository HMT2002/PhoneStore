import React, { Fragment, useState, useEffect } from "react";
import "./UpdatePassword.css";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

const UpdatePassword = ({ history }) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, loading, isUpdated } = useSelector((state) => state.profile);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const updatePasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(updatePassword(myForm));
    };
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("Cập nhật thông tin thành công!")
            history.push("/account");
            dispatch({
                type: UPDATE_PASSWORD_RESET,
            });
        }
    }, [dispatch, error, alert, history, isUpdated]);
    return (<Fragment>
        {loading ? (
            <Loader />
        ) : (
            <Fragment>
                <MetaData title="Thay đổi mật khẩu" />
                <div className=" updatePasswordContainer">
                    <div className=" updatePasswordBox">
                        <h2 className=" updatePasswordHeading">Thay đổi mật khẩu</h2>

                        <form
                            className=" updatePasswordForm"
                            encType="multipart/form-data"
                            onSubmit={updatePasswordSubmit}
                        >
                            <div className="loginPassword">
                                <VpnKeyIcon />
                                <input
                                    type="password"
                                    placeholder="Mật khẩu củ"
                                    required
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                />
                            </div>
                            <div className="loginPassword">
                                <LockOpenIcon />
                                <input
                                    type="password"
                                    placeholder="Mật khẩu mới"
                                    required
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>
                            <div className="loginPassword">
                                <LockIcon />
                                <input
                                    type="password"
                                    placeholder="Xác nhận mật khẩu"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <input
                                type="submit"
                                value="Thay đổi"
                                className=" updatePasswordBtn"
                            />
                        </form>
                    </div>
                </div>
            </Fragment>
        )}
    </Fragment>);
}
export default UpdatePassword;