import React, { Fragment, useState, useEffect } from 'react';
import "./UpdatedProfile.css";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/FaceRounded";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loadUser, updateProfile} from '../../action/UserAction';
import { useAlert } from "react-alert";
import Loader from '../layout/Loader/Loader';
import { UPDATE_PROFILE_RESET } from '../../constants/UserConstants';
import Metadata from '../layout/Metadata';

function UpdatedProfile() {
  const { user } = useSelector(state => state.user);
  const { error, isUpdated, loading } = useSelector(state => state.profile);
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const location = useLocation();

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
  
  const updateProfileSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  
  };

  const updateProfileDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } 
  };

  const redirect = location.search ? location.search.split("=")[1] : "/account";

  useEffect(() => {
    if(user){
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
   
    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loadUser());//To save freshly updated data in redux store
      navigate(redirect);
      dispatch({ type: UPDATE_PROFILE_RESET }) // to again set isUpdated false as all updatation is complete
    }
  }, [dispatch, error, alert, navigate, redirect, isUpdated, user]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title="Update Profile" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>

              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default UpdatedProfile