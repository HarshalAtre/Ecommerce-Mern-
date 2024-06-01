
app=require('./app')
dotenv=require('dotenv')
dotenv.config({path:'./config.env'})
connectDB=require('./database.js')
const cors = require('cors');

app.use(cors());
// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
  });
  
//Setting up the port
const PORT=process.env.PORT || 3000

//database

connectDB()
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