import React, { useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Metadata from "../Metadata.js";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../action/ProductAction.js";
import Product from "./ProductCard.js";
import Loader from "../Loader/Loader.js";
import { useAlert } from "react-alert";

const Home = () => { 
  const alert = useAlert();// we can use useAlert here as we wraped components in index.js
  const dispatch = useDispatch();
        
        const { loading, error, products, productCount } = useSelector((state) => state.Product); 
 // As this four are present in ProductReducer, so we are using it.

 //The useEffect hook ensures the getProducts action is dispatched when the component mounts.
  useEffect(() => {
    
    if(error){
      alert.error(error);
     dispatch(clearError());
    }
   
    dispatch(getProducts()); 


  }, [dispatch,error,alert,error]);//

  return (
    <>
    {(loading)?(<Loader/>): (<>
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
      {products &&
              products.map((product) => (
                <Product product={product}/>
              ))}
    
      </div>
      </>)
}
    </>
  );
};

export default Home;