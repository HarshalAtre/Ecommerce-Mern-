import React, { useState } from 'react';
import axios from 'axios';
import './Sentiment.css';
import { useDispatch,useSelector } from 'react-redux';
import { getAllReviews } from '../../action/ProductAction';
const Sentiment = () => {
    const [id, setId] = useState('');
    const {reviews: r} = useSelector(state => state.productReviews);
  const [reviews, setReviews] = useState({
    review: []
  });
  const dispatch = useDispatch();
  const [response, setResponse] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(getAllReviews(id))
    r.forEach(rev => {
        reviews.review.push(rev.comment)
    });
    try {
      setResponse( await axios.post('http://127.0.0.1:7000/predict', reviews, {
        headers: { 'Content-Type': 'application/json' }
      }))
      console.log(response.data.overall_sentiment)
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
    <div className='container'>
      <h2>Review Form</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name='id' placeholder='Product ID' value={id}  onChange={(e) => setId(e.target.value)}/>
        <button type="submit">Predict Sentiments</button>
      </form>
      <div>{response && response.data.overall_sentiment}</div>
      <div>{reviews && reviews.review[0] && reviews.review.map((review,index) => <div key={index}>{review}</div>)}</div>
    </div>
  );
};

export default Sentiment;
