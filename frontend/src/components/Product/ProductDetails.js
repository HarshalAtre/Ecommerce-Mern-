import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearError, getAllReviews, getProductDetails, newReview } from '../../action/ProductAction';
import './ProductDetails.css';
import Carousel from 'react-material-ui-carousel';
import Rating from '@mui/material/Rating'; // Assuming you're using MUI's Rating component
import ReviewCard from './ReviewCard'; // Ensure this path is correct
import Loader from '../layout/Loader/Loader';
import { useAlert } from "react-alert";
import Metadata from '../layout/Metadata';
import { ADD_TO_CART } from '../../constants/CartConstants';
import { AddToCart } from '../../action/CartAction';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
// import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/ProducerConstants";
import axios from 'axios';
import Speedometer from './Speedometer';
function ProductDetails() {
  const[speed,setSpeed] = useState(false);
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  const {reviews: r} = useSelector(state => state.productReviews);
  const [reviews, setReviews] = useState({
    review: []
  });

  const [response, setResponse] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setReviews({
      review: []
    })

    setSpeed(true)
    r.forEach(rev => {
        reviews.review.push(rev.comment)
    });
    console.log(reviews)

    try {
      setResponse( await axios.post('http://127.0.0.1:5001/predict', reviews, {
        headers: { 'Content-Type': 'application/json' }
      }))
      console.log(response.data.overall_sentiment)
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(state => state.ProductDetails);
  const alert = useAlert();
  // Local state for quantity
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

 
  useEffect(() => {
    if(error){
     alert.error(error);
     dispatch(clearError());
    }
    if(reviewError){
      alert.error(reviewError);
      dispatch(clearError());
    }
    if(success){
      alert.success("Review Submitted Successfully");
      dispatch({type:NEW_REVIEW_RESET})
    }
    dispatch(getProductDetails(id));
    dispatch(getAllReviews(id))
    
  }, [dispatch, id,alert,error,reviewError,success]);



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
    open? setOpen(false): setOpen(true);
  };
  const SpeedToggle = () => {
    speed? setSpeed(false): setSpeed(true);
  };
  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productid", id);

    dispatch(newReview(myForm));

    setOpen(false);
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
        <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle} // if we click anywhere else it closes
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
      {/* <h2>Review Form</h2> */}
      <form onSubmit={handleSubmit}>
        {/* <input type="text" name='id' placeholder='Product ID' value={id}  onChange={(e) => setId(e.target.value)}/> */}
        <button className='senti' type="submit">Predict Sentiments</button>
      </form>
      {/* <div>{response && response.data.overall_sentiment}</div> */}
      {/* <div>{reviews && reviews.review[0] && reviews.review.map((review,index) => <div key={index}>{review}</div>)}</div> */}
  
      <Dialog
            aria-labelledby="simple-dialog-title"
            open={speed}
            onClose={SpeedToggle} // if we click anywhere else it closes
          >
            
             <DialogTitle>Review Analysis</DialogTitle>
            {response && <Speedometer data ={response.data}/>}
             <DialogActions>
              <Button onClick={SpeedToggle} color="secondary">
                Cancel
              </Button>
              </DialogActions>
          </Dialog>


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
