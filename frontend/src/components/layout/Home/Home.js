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
            <ProductSlider />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
