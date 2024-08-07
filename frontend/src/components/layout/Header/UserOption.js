import React from 'react'
import "./Header.css"
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import Backdrop from "@material-ui/core/Backdrop";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useNavigate } from "react-router-dom"; // Updated import
import { useAlert } from "react-alert";
import { logout } from '../../../action/UserAction';
import { useDispatch, useSelector } from 'react-redux';
// import Backdrop from "@material-ui/core/Backdrop";
function UserOption({user}) {
  const { cartItems } = useSelector((state) => state.cart);
    const alert = useAlert();
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const options=[
        {icon: <PersonIcon />, name: "Profile", func: account},
        {icon: <ExitToAppIcon />, name: "Logout", func: logoutUser},
        {icon: <ListAltIcon />, name: "Orders", func: orders},
        {
          icon: (
            <ShoppingCartIcon
              style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
            />
          ),
          name: `Cart(${cartItems.length})`,
          func: cart,
        },
    ]
    if(user.role==="admin"){
        options.unshift({icon: <DashboardIcon />, name: "Dashboard", func: dashboard}) // unshift adds an element to the beginning of an array
    }
    
    function dashboard() {
        navigate("/admin/dashboard"); 
      }
    
      function orders() {
        navigate("/orders"); 
      }
      function account() {
        navigate("/account"); 
      }
      function cart() {
        navigate("/cart");
      }
      function logoutUser() {
        dispatch(logout());
        alert.success("Logout Successfully");
        navigate("/login");
      }
  return (
    <>
    <Backdrop open={open} style={{zIndex:"10"}}/>
    <SpeedDial
    ariaLabel='SpeedDial tooltip example'onClose={() => setOpen(false)}
    onOpen={() => setOpen(true)}
    style={{ zIndex: "11", marginTop:"20px"}}
    open={open}
    direction="down"
    className="speedDial"
    icon={
      <img
        className="speedDialIcon"
        src={user.avatar.url ? user.avatar.url : "/Profile.png"}
        alt="Profile"
      />
    }
  >
    {options.map((item)=>(
       <SpeedDialAction
       key={item.name}
       icon={item.icon}
       tooltipTitle={item.name}
       onClick={item.func}
       tooltipOpen={window.innerWidth <= 600 ? true : false}
     />
    ))}

    </SpeedDial>
    </>
  )
}

export default UserOption