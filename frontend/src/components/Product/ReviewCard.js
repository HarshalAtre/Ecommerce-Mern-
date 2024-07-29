import { Rating } from "@material-ui/lab";
import React from "react";
import profilePng from "../../images/Profile.png";
import {motion} from "framer-motion";
const ReviewCard = ({ review }) => {
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <motion.div className="reviewCard"
    initial={{ opacity: 0 ,scale: 0.5 }}
        whileInView={{ opacity: 1,scale: 1 }}
        transition={{ duration: 0.3 }}>
      <img src={profilePng} alt="User" />
      <p>{review.name}</p>
      <Rating {...options} />
      <span className="reviewCardComment">{review.comment}</span>
    </motion.div>
  );
};

export default ReviewCard;