import logo from './logo.svg';
import Header from './components/layout/Header/Header.jsx';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import WebFont from "webfontloader"
import { useEffect } from 'react';
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
function App() {
 
  const {isAuthenticated,user}=useSelector((state)=>state.user);
   
  useEffect(() => {

    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    });
    store.dispatch(loadUser());
    
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
      {isAuthenticated &&  <Route  path='/account' element={<Profile/>}/>}
      {isAuthenticated &&  <Route  path='/me/update' element={<UpdatedProfile/>}/>}
      {isAuthenticated &&  <Route  path='/password/update' element={<UpdatePassword/>}/>}
      {isAuthenticated &&  <Route  path='/cart' element={<Cart/>}/>}
      {isAuthenticated &&  <Route  path='/login/shipping' element={<Shipping/>}/>}

     



        

      </Routes>
    <Footer/>
    
    </Router>
    </>
  );
}

export default App;
