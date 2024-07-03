const mongoose = require('mongoose');
dotenv=require('dotenv')
dotenv.config({path:'./config.env'})

const connectToMongoDB = async () => {
  try {
    const uri = "mongodb+srv://Harshal:3YJfLzhmv9RBiF6j@cluster0.50encmi.mongodb.net/Ecom";
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
