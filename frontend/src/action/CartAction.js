import axios from "axios";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../constants/CartConstants";

//Update Password
export const AddToCart= (id,quantity) => async (dispatch,getState) => {

      const { data } = await axios.get(`/api/v1/product/${id}`);
      
      const product = data
     
      dispatch({
         type: ADD_TO_CART,
         payload: {
            product_id: product._id,
            name: product.name,
            price: product.price,
            stock: product.Stock,
            image: product.images[0].url,
            quantity:quantity,
         }
         });
      
      localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems)); // to save in local storage
  };

  export const RemoveFromCart = (id) => async (dispatch,getState) => {
    console.log(
        id
    )
      dispatch({
         type: REMOVE_FROM_CART,
         payload: id,
      });
      localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems)); // to save in local storage
  }