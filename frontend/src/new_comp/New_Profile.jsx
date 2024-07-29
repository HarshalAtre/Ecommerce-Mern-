import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import './UserProfileCard.css';
import Metadata from "../components/layout/Metadata";
import { motion } from "framer-motion";

const UserProfileCard = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const { orders } = useSelector((state) => state.myOrders);
  if (isAuthenticated === false) {
    return <Navigate to="/login" />;
  }
   const navigate=useNavigate();
  return (
    <>
     <Metadata title={`${user.name}'S Profile`} />
    <motion.div className="profileCard"
     initial={{ opacity:0,y:200  }}
     animate={{opacity:1,y: 0 }}
     transition={{ duration: 0.5,type:"spring", stiffness: 200 }}
     drag
     dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <div className="profileImg">
        <img src={user.avatar.url} alt="Profile" />
      </div>
      <div className="profileInfos">
        <div className="profileName">
          <h2>{user.name}</h2>
          <h4>{user.email}</h4>
        </div>
        <p className="profileText">
          Thanks For Choosing US . You can continue shopping by Going to Home or products
        </p>
        <ul className="profileStats">
          <li>
          <Link to="/orders">
            <h3>{cartItems.length}</h3>
            <h4>Cart items</h4>
            </Link>
          </li>
        <li>
            <h3>{orders.length}</h3>
            <h4>My orders</h4>
          </li>
          <li>
            <h3>{String(user.createdAt).substr(0, 10)}</h3>
            <h4>Joined on</h4>
          </li>
        </ul>
        <div className="profileLinks">
          <button className="profileFollow" onClick={()=>{navigate("/me/update")}} >Edit Profile</button>
          <button className="profileView" onClick={()=>{navigate("/password/update")}}>Change Password</button>
        </div>
      </div>
    </motion.div>
    </>
  );
};

export default UserProfileCard;
