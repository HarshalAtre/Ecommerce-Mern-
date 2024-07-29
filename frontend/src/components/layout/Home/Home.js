import React, { useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Metadata from "../Metadata.js";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../action/ProductAction.js";
import Product from "./ProductCard.js";
import Loader from "../Loader/Loader.js";
import { useAlert } from "react-alert";
import BannerComponent from "../../../new_comp/Banner.js";
import ProductSlider from "../../../new_comp/ProductSlider.js";
import MyCarousel from "../../../new_comp/Carasoul.js";
import { motion } from "framer-motion";
import Dragger from "../../../new_comp/Dragger.jsx";
import { Stack } from "../../../new_comp/stack.jsx";
import Faq from 'react-faq-component';
const data = {
  title: "FAQ",
  rows: [
    {
      title: "So Many ECommerce are there Why should I choose this?",
      content: "We focus on helping customers to make mindful decisions while buying a product with held of our highly accurate machine learning model features such as product review analysis, product price comparison, and product recommendation. We are the best in the market and we are proud of it.",
    },
    {
      title: "What payment methods do you accept?",
      content: "We accept all major credit cards, PayPal, and Apple Pay."
    },
    {
      title: "How can I track my order?",
      content: "Once your order is shipped, you will receive an email with a tracking number and a link to track your order."
    },
    {
      title: "What is your return policy?",
      content: "You can return any item within 30 days of purchase. The item must be in its original condition with all tags attached."
    },
    {
      title: "Can I change or cancel my order?",
      content: "You can change or cancel your order within 24 hours of placing it by contacting our customer service team."
    }
  ]
};

const Home = () => {
  const alert = useAlert(); // we can use useAlert here as we wrapped components in index.js
  const dispatch = useDispatch();
  const { loading, error, products, productCount } = useSelector((state) => state.Product); // As these four are present in ProductReducer, so we are using it.

  // The useEffect hook ensures the getProducts action is dispatched when the component mounts.
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    dispatch(getProducts());
  }, [dispatch, error, alert]);

  return (
    <div style={{ marginTop: "10px" }}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Metadata title="Ecommerce" />
          <div style={{ marginBottom: "10px" }}>
            <BannerComponent />
          </div>

          <div style={{ marginBottom: "10px" }}>
          <div
            >
              <MyCarousel />
            </div>
          </div>

          <div style={{ marginBottom: "10px" }}
            >
            <Dragger />
          </div>

          <div style={{ marginBottom: "10px" }} >
            
              <MyCarousel />
           
          </div>
          <div className='stack' style={{FlexDirection: window.innerWidth>600 ? "row" : "column"}}><Stack/> <Stack/> <Stack/> <Stack/></div>
          <div style={{ marginBottom: "0rem" }}>
            <h2 className="homeHeading" style={{ marginTop: "7vmax" }}>
              Featured Products
            </h2>
            <ProductSlider isProduct={false} />
          </div>
        </>
      )}
      <div className="faqContainer">
       <div className="faq">
        <Faq data={data}/>
      </div>
      </div>
    </div>
  );
};

export default Home;
