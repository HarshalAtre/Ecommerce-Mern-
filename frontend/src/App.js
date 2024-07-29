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
import Sentiment from './components/Product/Sentiment.js';
import Speedometer from './components/Product/Speedometer.js';
import Recommend from './components/testing/Recommend.js';
import BannerComponent from './new_comp/Banner.js';
import NavbarComponent from './new_comp/NavBar.js';
import ProductCard from './components/layout/Home/ProductCard.js';
import ProductSlider from './new_comp/ProductSlider.js';
import SimpleSlider from './new_comp/Carasoul.js';
import MyCarousel from './new_comp/Carasoul.js';
import ProductShowcase from './new_comp/Swiper.js';
import Spider from './new_comp/Spidermon.jsx';
import styled, { createGlobalStyle } from 'styled-components';
import Dragger from './new_comp/Dragger.jsx';
import NewReview from './new_comp/New_Review.jsx';
import { Stack } from './new_comp/stack.jsx';
import { Shapes } from './new_comp/Button/Shapes.jsx';
import { Button } from '@mui/material';
import Butt from './new_comp/Button/Buutt.jsx';
import UserProfileCard from './new_comp/New_Profile.jsx';


const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Poppins', sans-serif;
    background-image: repeating-linear-gradient(
        to right, #2d2a44 0 1px, transparent 2px 200px
      ),
      repeating-linear-gradient(
        to bottom, #2d2a44 0 1px, transparent 2px 200px
      ),
      radial-gradient(at 50% 50%, #2d2a44, #1d1b34);
  }
`;
const items = [
  { id: 1, subtitle: 'Subtitle 1', title: 'Title 1' },
  { id: 2, subtitle: 'Subtitle 2', title: 'Title 2' },
  { id: 3, subtitle: 'Subtitle 3', title: 'Title 3' },
];
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
    // window.addEventListener("contextmenu", (e) => e.preventDefault());
  },[])
  
  
  return (
    <>
    <GlobalStyle/>
     <Router>
      <NavbarComponent/>
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
      {isAuthenticated==true && <Route  path='/account' element={<UserProfileCard/>}/>}
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
      { <Route  path='/sentiment' element={<Sentiment/>}/>}
      { <Route  path='/speed' element={<Speedometer/>}/>}
      { <Route  path='/recommend' element={<Recommend/>}/>}
      { <Route  path='/banner' element={<BannerComponent/>}/>}
      { <Route  path='/nav' element={<NavbarComponent/>}/>}
      { <Route  path='/card' element={<ProductSlider/>}/>}
      { <Route  path='/car' element={<MyCarousel/>}/>}
      { <Route  path='/swipe' element={<ProductShowcase/>}/>}
      {/* { <Route  path='/spider' element={<Spider/>}/>} */}
      { <Route  path='/drag' element={<Dragger/>}/>}
      { <Route  path='/button' element={<Butt/>}/>}
      {isAuthenticated==true && <Route  path='/userprofile' element={<UserProfileCard/>}/>}
      { <Route  path='/rev'  element={<NewReview items={items}/>}/>}

      { <Route  path='/stack'  element={ 
        
        <div className='stack'> 
        
        <Stack/> <Stack/> <Stack/> <Stack/>
        </div>}/>}











      
      

      
          <Route exact path="/process/payment" element={
            <Elements stripe={loadStripe("pk_test_51PO5892Mx3ZlZWKCjXflODu4Xp3M9QVfhwv5E6roIeTm03GUhQhjuuQb8frqFTHS9BJAOsZ3KDcEjdaV1yVdokNr00XeeWt9o9")}>
          <Payment/>
          </Elements>
          } />
       
     

      </Routes>
    {/* <Footer/> */}
    
    </Router>
    </>
  );
}

export default App;
