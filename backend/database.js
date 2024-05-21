const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

const connectToMongoDB = async () => {
  try {
    const uri = process.env.MONGODB_URL;
    if (!uri) {
      throw new Error('MONGODB_URL is not defined in the environment variables');
    }

    const options = {
    //   useNewUrlParser: true, 
    //   useUnifiedTopology: true,
    }; 

    await mongoose.connect(uri, options);
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectToMongoDB;
