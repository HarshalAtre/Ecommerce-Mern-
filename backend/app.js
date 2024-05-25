const express= require('express');
const Errorhandler=require('./middleware/error');
const app= express();
const products= require('./routes/product_route');
const user= require('./routes/User_route');
const cookieParser= require('cookie-parser');
app.use(express.json());

app.use(Errorhandler)
app.use(cookieParser());
app.use('/api/v1',products);
app.use('/api/v1',user);

module.exports= app;