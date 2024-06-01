import React, { useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Metadata from "../Metadata.js";
import {useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../action/ProductAction.js";

// const product = {
//     name: "Blue T shirt",
//     images: [{
//         url: "https://i.ibb.co/DRST11n/1.webp"
//     }],
//     price: '1,999',
//     id: "abhishek" 
// };


const Home = () => { 
 
  const dispatch = useDispatch();// dispatch is a function that allows us to dispatch actions to the redux store
  const {loading,error,products,productsCount} = useSelector((state) => state.products);
 useEffect(()=>{
   dispatch(getProducts()); // calling the action
 },[dispatch])
  return (
   <>

          <Metadata title="Ecommerce"/> 
          <div className="banner"> 
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container"> 
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>
        
          <h2 className="homeHeading">Featured Products</h2> 

          <div className="container" id="container">
            {/* {products && products.map((product) => (
              <Product key={product._id} product={product} />
            ))} */}

          </div>
        </>
  );
};

export default Home;