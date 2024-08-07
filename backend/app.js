const express= require('express');
const Errorhandler=require('./middleware/error');
const app= express();
const products= require('./routes/product_route');
const user= require('./routes/User_route');
const order= require('./routes/order_routes');
const payment= require('./routes/payment_route');
const cors = require('cors');
const cookieParser= require('cookie-parser');
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
dotenv=require('dotenv')
dotenv.config({path:'./.env'})
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
 
// If you are using body-parser, use the following instead
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));  
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
 

app.use(express.json());
app.use(cors());
app.use(Errorhandler)
app.use(cookieParser());
app.use('/api/v1',products);
app.use('/api/v1',user);
app.use("/api/v1",order)
app.use("/api/v1",payment)

module.exports= app;