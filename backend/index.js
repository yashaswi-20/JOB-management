import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import connectDb from './utils/db.js';
dotenv.config({})

const app=express();
connectDb();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const corsOptions={
    origin:"http://localhost:5173",
    credentails:true,
}
app.use(cors(corsOptions));

//routes
app.get('/',(req,res)=>{
    return res.json({
        "msg":'hello'
    })
})

const PORT=process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log("server started..")
})