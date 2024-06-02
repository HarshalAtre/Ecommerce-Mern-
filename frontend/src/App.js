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
function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    });
  })
  return (
    <>
     <Router>
      <Header/>
      
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path='/product/:id' element={<ProductDetails/>}/>
        <Route exact path='/products' element={<Products/>}/>
        <Route  path='/products/:keyword' element={<Products/>}/>
        <Route exact path='/Search' element={<Search/>}/>
        

      </Routes>
    <Footer/>
    
    </Router>
    </>
  );
}

export default App;
