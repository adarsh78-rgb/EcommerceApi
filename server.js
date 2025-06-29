import { config } from "dotenv";
import express from "express";
import bodyParser from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.js";
import productRouter from "./routes/product.js";
import cartRouter from "./routes/cart.js";



config({path:".env"})
const app = express();
app.use(bodyParser.json());

const port = process.env.PORT;
const monguri = process.env.MONGO;

//using router
//user router
app.use('/api/user',userRouter);
//product router
app.use('/api/product',productRouter);
//cart router
app.use('/api/cart',cartRouter);




mongoose.connect(monguri,{
    dbName:"ECommerce_API",
}).
then(()=>{
    console.log("database connected :)")
}).
catch((err)=>{
    console.log(err);
}).
then(()=>{
    app.listen(port,()=>{
        console.log(`Server Running on PORT = ${port}`);
    })
});


//11