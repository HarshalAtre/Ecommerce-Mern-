
import {ALL_PRODUCT_REQUEST,ALL_PRODUCT_SUCCESS,ALL_PRODUCT_FAIL,CLEAR_ERRORS} from "../constants/ProducerConstants"

export const ProductReducer = (state = { products: [] }, action) => {
    switch (action.type)   {// checking type of action we dispatched and doing accordingly
        
        case ALL_PRODUCT_REQUEST: // this are basically string but just to be error free we make them variable 
            
            return { loading: true,
                     products: [] 
                  }; // when requensting then loading is true and product array is empty
        case ALL_PRODUCT_SUCCESS:
            
            return { loading: false,
                     products: action.payload,
                     productCount: action.payload.productCount,
                     };// when success then loading is false and product array is filled with data , also productCount is filled with data 
     
            
        case ALL_PRODUCT_FAIL:
            
            return { loading: false, error: action.payload }; // when failed then loading is false and error is filled with data
        
        case CLEAR_ERRORS:
            return {...state, error: null}   // To clear error, returns state as it is

        default:
            return state;
    }
}