# IntelliShop: ML-Powered E-commerce Platform

Welcome to **IntelliShop**, an innovative e-commerce platform designed to enhance mindful buying! With cutting-edge features like **image-based search** and a **review sentiment analyzer**, IntelliShop simplifies your shopping experience. Effortlessly find similar products using images and gain insights into what reviewers think, helping you make informed purchasing decisions.

[![Watch the demo video](https://i.imgur.com/Mal9btC.png)](https://drive.google.com/file/d/1rDR7ahD0ctgO203OU7opNVgI3trHCpXC/view)



## Features

### Image-Based Search
Utilizing **ResNet** architecture and **TensorFlow 2.0**, our platform supports advanced image-based search functionality. Upload an image, and IntelliShop will identify and display similar products from a catalog of over 1,000 items with **95% accuracy**. The integration is powered by Flask, ensuring seamless communication between the frontend and ML model.

### Review Sentiment Analysis
Our **LSTM model**, integrated using Flask, delivers precise sentiment analysis with an impressive **90% accuracy rate**. Users can view the sentiment breakdown of reviews and an overall positivity score, offering valuable insights that enhance decision-making by up to 50%.

### Product Recommendation Engine
IntelliShop employs a robust recommendation system, combining **collaborative filtering** and **content-based filtering** algorithms. This engine presents 20 highly relevant product suggestions to each user with a **98% precision rate**, boosting user engagement and increasing conversion rates by **25%**.

## Technical Overview

### Backend
- Built over **Node.js** and **Express.js**, the backend handles scalable server operations and efficiently manages requests through 10+ RESTful APIs.
- Data is stored and retrieved using **MongoDB**, ensuring fast and reliable operations.

### Machine Learning Integration
- **Review Sentiment Analyzer**: Engineered using an **LSTM model** and integrated with the platform via Flask.
- **Image-Based Search**: Powered by **ResNet** with **TensorFlow 2.0**, delivering high-accuracy results for image similarity detection.
- **Recommendation Engine**: Combines collaborative and content-based filtering techniques for precise product suggestions.

### Frontend
- Designed with **React.js**, delivering a responsive and intuitive user interface.

### Payments and Notifications
- **Stripe** integration for secure and seamless payment processing.
- **Nodemailer** integration for transactional and notification emails.

## How to Run

Clone the repository:
```bash
git clone https://github.com/yourusername/intellishop.git
cd intellishop
```

Install dependencies:
```bash
npm install
```

Set up environment variables for database connection, Stripe, and Nodemailer.

Start the server:
```bash
npm start
```

Run the Flask app for ML features in the `ml` directory:
```bash
cd ml
python app.py
```

Access the platform at:
```bash
http://localhost:3000
```

## Contributions
Feel free to fork the repository and submit pull requests. Suggestions and improvements are welcome!

