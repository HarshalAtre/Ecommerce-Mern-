import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../action/ProductAction'; // Make sure the path is correct
import Loader from '../layout/Loader/Loader';
import Metadata from '../layout/Metadata';
import ProductCard from '../layout/Home/ProductCard';
import "./Products.css";
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import { Slider,Typography } from '@mui/material';

const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

function Products() {
  const [ratings, setRatings] = useState(0);
  const [categorya, setCategory] = useState("");
  const [price, setPrice] = useState([0,25000]);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  const setCurrentPageNo = (pageNumber) => {
      setCurrentPage(pageNumber);
  }

  const changePrice=(event,newPrice)=>{
      setPrice(newPrice);
    //   dispatch(getProducts(keyword,currentPage,price));
  }

  const { loading, products, error,resultPerPage, productsCount , filteredProductCount} = useSelector(state => state.Product); // Make sure the state slice is correct
  const {keyword}=useParams();

  useEffect(() => {
    dispatch(getProducts(keyword,currentPage,price,categorya,ratings));// sending them as an argument

  }, [dispatch,keyword,currentPage,categorya,price,ratings]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : ( 
        <Fragment>
          <Metadata title="PRODUCTS -- Ecomerce" />
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products && products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </Fragment>

      )}
       <div className='filterBox'>
        <Typography>Price</Typography>
        <Slider
          value={price} // array  of min and max range
          onChange={changePrice}
          valueLabelDisplay="auto"
          aria-labelledby='range-slider'
          min={0}
          max={25000}
        />

       
        <Typography>Categories</Typography>
        <ul className="categoryBox">
                {categories.map((category) => (
                    <li
                    className="category-link"
                    key={category}
                    onClick={()=>{setCategory(category);}}
                    >
                            {category}
                        </li>
                ))}
        </ul>
        <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
                </div>
       
      { productsCount>resultPerPage?
     (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo} // it automatically pagenumber based on currentpage ,productcountsand what we click, 1st 2nd last etc
                nextPageText=">"
                prevPageText="<"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          ):(<div className="paginationBoxNoUi"></div>)
        }
       
      
    </Fragment>
  );
}

export default Products;
