import { ADD_TO_CART,REMOVE_FROM_CART } from "../constants/CartConstants";
          
export const CartReducer = (state = { cartItems: []}, action) => {
    switch (action.type) {
        case ADD_TO_CART:
           
            const item = action.payload;
            
            // Check if the item is already in the cart
            const isItemInCart = state.cartItems.find((cartItem) => cartItem.product_id === item.product_id);
            
            if (isItemInCart) {
                  return {
                      ...state,
                      cartItems: state.cartItems.map((cartItem) =>
                        cartItem.product_id === item.product_id ? item : cartItem // if item is already in cart, replace it with item we are sending which is same just quantity may differ so it gets updated
                      ),
                  }
            }
            else{
                
                return {
                  ...state,
                  cartItems: [...state.cartItems, item], // if not already in cart, add it , this is the syntax for adding an item to an array
                };
            }
        case REMOVE_FROM_CART:
            let items=state.cartItems
            let newCart=[]
            for(let i=0;i<items.length;i++){ // loop through the cart items, and not add the one we want to remove 
                if(items[i].product_id!==action.payload){ // payload here is id which want to remove
                    newCart.push(items[i])
                }
            }
            return {
                ...state,
                cartItems: newCart 
            }
              default:
                return state;
            }
          };