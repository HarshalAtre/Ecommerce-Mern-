import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearError, getProductDetails } from '../../action/ProductAction';
import './ProductDetails.css';
import Carousel from 'react-material-ui-carousel';
import Rating from '@mui/material/Rating'; // Assuming you're using MUI's Rating component
import ReviewCard from './ReviewCard'; // Ensure this path is correct
import Loader from '../layout/Loader/Loader';
import { useAlert } from "react-alert";
import Metadata from '../layout/Metadata';
import { ADD_TO_CART } from '../../constants/CartConstants';
import { AddToCart } from '../../action/CartAction';
function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(state => state.ProductDetails);
  const alert = useAlert();
  // Local state for quantity
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if(error){
     alert.error(error);
     dispatch(clearError());
    }
    dispatch(getProductDetails(id));

  }, [dispatch, id,alert,error]);

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1); // should not go below 
  };

  const increaseQuantity = () => {
    if (quantity < product.Stock) setQuantity(quantity + 1); // should not exceed stock limit
  };

  const addToCartHandler = () => {
    alert.success("Item added to cart");
    dispatch(AddToCart(id, quantity));
  };

  const submitReviewToggle = () => {
    // Implement review toggle functionality
  };

  const options = {
    value: product.ratings || 0, // Ensure ratings are handled correctly
    readOnly: true,
    precision: 0.5,
  };

  return (
    <Fragment>
      <Metadata title={`${product.name} -- ECOMMERCE`} />
      {loading ? (
       <Loader/>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="ProductDetails">
          <div>
            <Carousel className="caro">
              {product.images &&
                product.images.map((item, i) => (
                  <img
                    className="CarouselImage"
                    key={i}
                    src={item.url}
                    alt={`${i} Slide`}
                  />
                ))}
            </Carousel>
          </div>
          <div>
            <div className="detailsBlock-1">
              <h2>{product.name}</h2>
              <p>Product # {product._id}</p>
            </div>
            <div className="detailsBlock-2">
              <Rating {...options} />
              <span className="detailsBlock-2-span">
                ({product.numOfReviews} Reviews)
              </span>
            </div>
            <div className="detailsBlock-3">
              <h1>{`₹${product.price}`}</h1>
              <div className="detailsBlock-3-1">
                <div className="detailsBlock-3-1-1">
                  <button onClick={decreaseQuantity}>-</button>
                  <input readOnly type="number" value={quantity} />
                  <button onClick={increaseQuantity}>+</button>
                </div>
                <button
                  disabled={product.Stock < 1}
                  onClick={addToCartHandler}
                >
                  Add to Cart
                </button>
              </div>

              <p>
                Status:
                <b className={product.Stock < 1 ? 'redColor' : 'greenColor'}>
                  {product.Stock < 1 ? 'OutOfStock' : 'InStock'}
                </b>
              </p>
            </div>

            <div className="detailsBlock-4">
              Description: <p>{product.description}</p>
            </div>

            <button onClick={submitReviewToggle} className="submitReview">
              Submit Review
            </button>
          </div>
        </div>
      )}
      
      {product.reviews && product.reviews.length > 0 ? (
        <div className="reviews">
          {product.reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>
      ) : (
        <p className="noReviews">No Reviews Yet</p>
      )}
    </Fragment>
  );
}

export default ProductDetails;
