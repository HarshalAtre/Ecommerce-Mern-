import React, { useState } from "react";
import "./CartItemCard.css";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const CartItemCard = ({ item, deleteCartItems }) => {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      deleteCartItems(item.product_id);
    }, 500); // Duration of the exit animation
  };

  return (
    <AnimatePresence>
      {!isRemoving && (
        <motion.div
          className="CartItemCard"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
          layout
        >
          <img src={item.image} alt="ssa" />
          <div style={{ color: "white" }}>
            <Link to={`/products/${item.product}`}>{item.name}</Link>
            <span>{`Price: ₹${item.price}`}</span>
            <p onClick={handleRemove}>Remove</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartItemCard;
