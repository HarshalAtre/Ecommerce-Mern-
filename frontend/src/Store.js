import {createStore,combineReducers,applyMiddleware} from 'redux'
import {thunk} from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {  ProductDetailReducer, ProductReducer, UpdateProductReducer, newProductReducer, newReviewReducer, productReviewsReducer, reviewReducer } from './reducers/Productreducer'
import { UpdateProfileReducer, allUsersReducer, userDetailsReducer, userReducer } from './reducers/UserReducer';
import { CartReducer } from './reducers/CartReducer';
import { GetOrderReducer, allOrdersReducer, myOrdersReducer, newOrderReducer, orderReducer } from './reducers/OrderReducer';

// 4 main things to make reducer , initial state , middleware , store 

const reducer = combineReducers({ //reducer
    Product:ProductReducer, // so we have to use state.Product when using useSelector hook to get data from store
    ProductDetails:ProductDetailReducer,
    user:userReducer,
    profile:UpdateProfileReducer,
    cart:CartReducer,
    newOrder:newOrderReducer,
    myOrders:myOrdersReducer,
    orderDetails:GetOrderReducer,
    newReview:newReviewReducer,
    newProduct:newProductReducer,
    UpdateProduct:UpdateProductReducer,
    allOrders:allOrdersReducer,
    order:orderReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer,

  });

let initialState={
  cart:{//we have stored the data in local storage (can see in CartAction) so that when we refresh the page the data will be there
    cartItems:localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [], // if cartItems is not present in local storage then it will be an empty array
    // if cartItems is present in local storage then it will be an array of objects (as parsed)
    
    shippingInfo:localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")) : {} // if shippingInfo is not present in local storage then it will be an empty object
  },

 

} // initial state

const middleware=[thunk]  // middleware

const store=createStore( // creating Store combining all three above
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))

)

export default store;//store.js