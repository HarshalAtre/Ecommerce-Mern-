import React, { useState } from 'react';
import axios from 'axios';
import './Recommend.css';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

function Recommend() {
    const [file, setFile] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const navigate=useNavigate();
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };
    const handleImageClick = (id) => {
        navigate(`/product/${id}`)
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://127.0.0.1:5001/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response)
            setRecommendations(response.data.recommendations);
        } catch (error) {
            console.error('There was an error uploading the file!', error);
        }
    };

   

    return (
        <div className="App">
           <Typography fontSize={20}>Upload Image To Search For A Product</Typography>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Recommend</button>
            </form>
            <div className="recommendations">
                {recommendations.map((rec, index) => (
                    <img key={index} onClick={() => handleImageClick(rec.product_id)} src={`http://127.0.0.1:5001${rec.image_url}`} alt={`Recommendation ${index + 1}`} />
                ))}
            </div>

            {selectedProduct && (
                <div className="product-details">
                    <h2>Product Details</h2>
                    <p><strong>Product ID:</strong> {selectedProduct.product_id}</p>
                    <p><strong>Name:</strong> {selectedProduct.name}</p>
                    <p><strong>Price:</strong> ${selectedProduct.price}</p>
                    <img src={selectedProduct.image_url} alt="Selected Product" />
                </div>
            )}
        </div>
    );
}

export default Recommend;
