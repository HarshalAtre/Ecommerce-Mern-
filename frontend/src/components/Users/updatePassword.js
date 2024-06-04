import React, { Fragment, useState, useEffect } from 'react';
import "./UpdatePassword.css";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/FaceRounded";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword} from '../../action/UserAction';
import { useAlert } from "react-alert";
import Loader from '../layout/Loader/Loader';
import { UPDATE_PASSWORD_RESET, UPDATE_PROFILE_RESET } from '../../constants/UserConstants';
import Metadata from '../layout/Metadata';
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";


function UpdatePassword() {

    const { error, isUpdated, loading } = useSelector(state => state.profile);
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const location = useLocation();
  
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
  
   
    const redirect = location.search ? location.search.split("=")[1] : "/account";
  
    useEffect(() => {
      
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
     
      if (isUpdated) {
        alert.success("Password Updated Successfully");
        navigate(redirect);
        dispatch({ type: UPDATE_PASSWORD_RESET }) // to again set isUpdated false as all updatation is complete
      }
    }, [dispatch, error, alert, navigate, redirect, isUpdated]);
  
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title="Change Password" />
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Change Password</h2>

              <form
                className="updatePasswordForm"
                onSubmit={updatePasswordSubmit}
              >
                <div className="loginPassword">
                  <VpnKeyIcon />
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>

                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Change"
                  className="updatePasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default UpdatePassword