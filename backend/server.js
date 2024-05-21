
app=require('./app')
dotenv=require('dotenv')
dotenv.config({path:'./config.env'})
connectDB=require('./database.js')
//Setting up the port
const PORT=process.env.PORT || 3000

//database

connectDB()
//Starting the server   
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})