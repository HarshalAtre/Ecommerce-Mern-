import React, { Fragment, useState } from 'react'
import Metadata from '../layout/Metadata';
import "./Search.css"
import { useNavigate } from 'react-router-dom';
function Search() {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();
    const searchSubmitHandler = (e)=>{
        e.preventDefault();
        if(keyword.trim()){
            navigate(`/products/${keyword}`)
        }else{
            navigate("/");
        }
        // console.log(keyword);
    }
  return (
    <Fragment>
    <Metadata title="Search Products" />
    <form className="searchBox" onSubmit={searchSubmitHandler}>
      <input
        type="text"
        placeholder="Search a Product ..."
        onChange={(e) => setKeyword(e.target.value)}
      />
      <input type="submit" value="Search" />
    </form>
  </Fragment>
  )
}

export default Search 