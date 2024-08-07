import React, { Fragment, useEffect, useState } from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard.js";
import { useSelector, useDispatch } from "react-redux";

import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import { AddToCart, RemoveFromCart } from "../../action/CartAction.js";
import { motion } from "framer-motion";
const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
 const [count, setCount] = useState(0)
  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(AddToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(AddToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(RemoveFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };
  const totalPrice = () => {
    let total = 0;
  
    for (let i = 0; i < cartItems.length; i++) {
      const itemTotal = cartItems[i].quantity * cartItems[i].price;
      total += itemTotal;
    }
  
    return total;
  };
  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />
  
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">
            <motion.div className="cartHeader"
            initial={{ opacity:0,y: -100 }}
            animate={{opacity:1,y: 0 }}
            transition={{ duration: 0.5,type:"spring", stiffness: 200 }}
            >
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </motion.div>

            {cartItems &&
              cartItems.map((item) => (
                <div className="cartContainer" key={item.product_id}
                >
                  <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                  
                  <motion.div className="cartInput"
                   initial={{ opacity:0,x: 100 }}
                   animate={{opacity:1,x: 0 }}
                   transition={{ duration: 0.5,type:"spring", stiffness: 200 }}
                  >
                    <button
                      onClick={() =>
                        decreaseQuantity(item.product_id, item.quantity)
                      }
                    >
                      -
                    </button>
                    <span style={{backgroundColor:"white",color:"black",padding:"8px"}}>{item.quantity}</span>
                    <button
                      onClick={() =>
                        increaseQuantity(item.product_id, item.quantity, item.stock)
                      }
                    >
                      +
                    </button>
                  </motion.div>
                  <motion.div
                   initial={{ opacity:0,x: 100 }}
                   animate={{opacity:1,x: 0 }}
                   transition={{ duration: 0.5,type:"spring", stiffness: 200 }}
                  >
                  <p className="cartSubtotal">{`₹${
                    item.price * item.quantity
                  }`}</p>
                  </motion.div>
                </div>
              ))}

          <motion.div
      className="cartGrossProfit"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
      layout
    >
      <div></div>
      <div className="cartGrossProfitBox">
        <p>Gross Total</p>
        <p>₹{totalPrice()}</p>
      </div>
      <div></div>
      <div className="checkOutBtn">
        <button onClick={checkoutHandler}>Check Out</button>
      </div>
    </motion.div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;