import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import gsap from 'gsap';
import './ProductSlider.css'; // Ensure you have the corresponding CSS file
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from "react-alert";
import { AddToCart } from '../action/CartAction';
import { Button } from '@mui/material';
import "./button.css";
const ProductSlider = ({isProduct}) => {
  const [sliderValue, setSliderValue] = useState(100000);
  const { products } = useSelector((state) => state.Product); 
  const alert = useAlert();
  const dispatch = useDispatch();
  const nav =useNavigate();
  useEffect(() => {
    products.forEach((product, index) => {
      const productElement = document.querySelector(`.product[data-index='${index}']`);
      if (sliderValue >= product.price) {
        gsap.to(productElement, { autoAlpha: 1, scale: 1, duration: 0.5 });
      } else {
        gsap.to(productElement, { autoAlpha: 0, scale: 0.8, duration: 0.5 });
      }
    });
  }, [sliderValue, products]);
  
  const addToCartHandler = (e, id) => {
    e.preventDefault(); // Prevent the default link behavior
    e.stopPropagation(); // Stop the event from propagating to the link
    const quantity = 1; // Correctly declare the quantity variable
    alert.success("Item added to cart");
    dispatch(AddToCart(id, quantity));
  };
  
  return (
    <div className="product-slider" style={{paddingLeft:isProduct?"7vmax":"0"}}>
     
      <div className="product-list"  style={{paddingLeft:isProduct?"7vmax":"0"}}>
        {products.map((product, index) => {
          const options = {
            edit: false,
            color: "rgba(255,248,72,0.3)",
            activeColor: "yellow",
            size: window.innerWidth < 60 ? 20 : 25, // Conditional size based on window width
            isHalf: true,
            customValue: 25, // Adding a custom value property; please replace "25" with your intended value
            value: product.ratings // Dynamically setting the value property
          };

          return (
            <Link className="productC" key={index} to={`/product/${product._id}`}>
              <div className="product" data-price={product.price} data-index={index}>
                <div className="img">
                  <img src={product.images[0].url} alt={product.name} />
                </div>
                <div className="info">
                  <h3>{product.name}</h3>
                  <p className='priceee'>₹{product.price} 
                  <p className={product.Stock < 1 ? "stockk_error" : "stockk_success"}>{product.Stock < 1 ? "Out of Stock" : "In Stock"}</p></p>
                </div>
                
                <ReactStars {...options} />

                {/* <button 
                  className='btn_atc' 
                  disabled={product.Stock < 1} 
                  onClick={(e) => addToCartHandler(e, product._id)} // Prevent redirection // Pass the function correctly
                >
                  Add to Cart
                </button> */}
                 <nav  
                  disabled={product.Stock < 1} 
                  onClick={(e) => addToCartHandler(e, product._id)}>
      <ul>
        <li>
          Add to Cart
          <span></span><span></span><span></span><span></span>
        </li>
      </ul>
    </nav>
              </div>
            </Link>
          );
        })}
      </div>
      {!isProduct  && <div className="input">
        <input
          type="range"
          min="50"
          max="100000"
          value={sliderValue}
          step="10"
          id="priceSlider"
          onChange={(e) => setSliderValue(parseInt(e.target.value))}
        />
        <span id="sliderValue">₹{sliderValue}</span>
       
      </div>}
    </div>
  );
};

export default ProductSlider;
