import logo from './logo.svg';
import Header from './components/layout/Header/Header.jsx';
import { BrowserRouter as Router, Route, Routes,} from 'react-router-dom';
import WebFont from "webfontloader"
import React, { useEffect, useState } from 'react';
import Footer from './components/layout/Footer/Footer.jsx';
import Home from './components/layout/Home/Home.js';
import "./App.css"
import Loader from './components/layout/Loader/Loader.js';
import ProductDetails from './components/Product/ProductDetails.js';
import Products from './components/Product/Products.js';
import Search from './components/Product/Search.js';
import LoginSignUp from './components/Users/LoginSignUp.js';
import store from './Store.js';
import { loadUser } from './action/UserAction.js';
import { useSelector } from 'react-redux';
import UserOption from './components/layout/Header/UserOption.js';
import Profile from './components/Users/Profile.js';
import UpdatedProfile from './components/Users/UpdatedProfile.js';
import UpdatePassword from './components/Users/updatePassword.js';
import Cart from './components/Cart/Cart.js';
import Shipping from './components/Cart/Shipping.js';
import ConfirmOrder from './components/Cart/OrderConfirm.js';
import axios from 'axios';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from './components/Cart/Payment.js';
import ProtectedRoute from './components/Route/ProtectedRoute.js';
import OrderSuccess from './components/Cart/OrderSuccess.js';
import MyOrders from './components/Order/MyOrders.js';
import OrderDetails from './components/Order/OrderDetails.js';
import { Switch } from '@material-ui/core';
import Dashboard from './components/Admin/Dashboard.js';
import Productlist from './components/Admin/Productlist.js';
import NewProduct from './components/Admin/NewProduct.js';
import UpdateProduct from './components/Admin/UpdateProduct.js';
import OrderList from './components/Admin/OrderList.js';
import ProcessOrder from './components/Admin/ProcessOrder.js';
import UsersList from './components/Admin/UserList.js';
import UpdateUser from './components/Admin/UpdateUser.js';
import ProductReviews from './components/Admin/ProductReviews.js';
function App() {
 
  const {isAuthenticated,user}=useSelector((state)=>state.user);
  const [ApiKey,setApiKey]=useState('')
  const getApiKey=async()=>{
    const {data} = await axios.get('/api/v1/stripeapikey');
    setApiKey(data.stripeApiKey);
    console.log(data.stripeApiKey)
  } 
  useEffect(() => {

    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    });
    store.dispatch(loadUser());
    // getApiKey()
    window.addEventListener("contextmenu", (e) => e.preventDefault());
  },[])
  
  
  return (
    <>
     <Router>

      <Header/>
     {isAuthenticated&& <UserOption user={user}/>}
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path='/product/:id' element={<ProductDetails/>}/>
        <Route exact path='/products' element={<Products/>}/>
        <Route  path='/products/:keyword' element={<Products/>}/>
        <Route exact path='/Search' element={<Search/>}/>
        <Route  path='/login' element={<LoginSignUp/>}/>

      {/* Protected routes */}
      {isAuthenticated==true && <Route  path='/account' element={<Profile/>}/>}
      {isAuthenticated==true &&  <Route  path='/me/update' element={<UpdatedProfile/>}/>}
      {isAuthenticated==true &&  <Route  path='/password/update' element={<UpdatePassword/>}/>}
      {isAuthenticated==true &&  <Route  path='/Cart' element={<Cart/>}/>}
      {isAuthenticated==true &&  <Route  path='/login/shipping' element={<Shipping/>}/>}
      {isAuthenticated==true &&  <Route  path='/success' element={<OrderSuccess/>}/>}
      {isAuthenticated==true &&  <Route  path='/orders' element={<MyOrders/>}/>}
     
      {isAuthenticated==true &&  <Route  path='/order/confirm' element={<ConfirmOrder/>}/>}
      {isAuthenticated==true &&  <Route  path='/order/:id' element={<OrderDetails/>}/>}
      
      {isAuthenticated==true &&  <Route  path='/admin/dashboard' element={<Dashboard/>}/>}
      {isAuthenticated==true &&  <Route  path='/admin/products' element={<Productlist/>}/>}
      {isAuthenticated==true &&  <Route  path='/admin/product' element={<NewProduct/>}/>}
      {isAuthenticated==true &&  <Route  path='/admin/product/:id' element={<UpdateProduct/>}/>}
      {isAuthenticated==true &&  <Route  path='/admin/orders' element={<OrderList/>}/>}
      {isAuthenticated==true &&  <Route  path='/admin/order/:id' element={<ProcessOrder/>}/>}
      {isAuthenticated==true &&  <Route  path='/admin/users' element={<UsersList/>}/>}
      {isAuthenticated==true &&  <Route  path='/admin/user/:id' element={<UpdateUser/>}/>}
      {isAuthenticated==true &&  <Route  path='/admin/reviews' element={<ProductReviews/>}/>}

      
      

      
          <Route exact path="/process/payment" element={
            <Elements stripe={loadStripe("pk_test_51PO5892Mx3ZlZWKCjXflODu4Xp3M9QVfhwv5E6roIeTm03GUhQhjuuQb8frqFTHS9BJAOsZ3KDcEjdaV1yVdokNr00XeeWt9o9")}>
          <Payment/>
          </Elements>
          } />
       
     

      </Routes>
    <Footer/>
    
    </Router>
    </>
  );
}

export default App;
