
app=require('./app')
dotenv=require('dotenv')
dotenv.config({path:'./.env'})
connectDB=require('./database.js')
const cors = require('cors'); 
const cloudinary=require("cloudinary");
app.use(cors());
// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
  });
  
//Setting up the port
const PORT=process.env.PORT || 5000

//database

connectDB()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//Starting the server   
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})

process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  
    server.close(() => {
      process.exit(1);
    });
  });