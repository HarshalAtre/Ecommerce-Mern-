import {createStore,combineReducers,applyMiddleware} from 'redux'
import {thunk} from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { ProductReducer } from './reducers/Productreducer'

// 4 main things to make reducer , initial state , middleware , store 

const reducer=combineReducers({  //reducers
    ProductReducer
})

let initialState={} // initial state

const middleware=[thunk]  // middleware

const store=createStore( // creating Store combining all three above
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))

)

export default store;//store.js