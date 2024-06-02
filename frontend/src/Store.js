import {createStore,combineReducers,applyMiddleware} from 'redux'
import {thunk} from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { ProductDetailReducer, ProductReducer } from './reducers/Productreducer'

// 4 main things to make reducer , initial state , middleware , store 

const reducer = combineReducers({ //reducer
    Product:ProductReducer, // so we have to use state.Product when using useSelector hook to get data from store
    ProductDetails:ProductDetailReducer
  });

let initialState={} // initial state

const middleware=[thunk]  // middleware

const store=createStore( // creating Store combining all three above
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))

)

export default store;//store.js