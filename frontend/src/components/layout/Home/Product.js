import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
const options = {
  edit: false,
  color: "rgba(20,20,20,0.1)",
  activeColor: "tomato",
  
  size: window.innerWidth < 60 ? 20 : 25, // Conditional size based on window width
  value: 2.5,
  isHalf: true,
  customValue: 25, // Adding a custom value property; please replace "25" with your intended value
};

const Product = ({ product }) => {
 
  return (
    <Link className="productCard" to={`${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <ReactStars {...options}/>
        <span className="productCardSpan"> 
          (256 Reviews)
        </span> 
      </div>
      <span>{`₹${product.price}`}</span>
    </Link>
  );
};

export default Product;