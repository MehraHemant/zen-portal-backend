import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './Routes/student-routes.js';
import routers from './Routes/session-routes.js';
import cors from 'cors';

dotenv.config();
const app = express();


app.use(cors({
    origin: true,
  }))
  
app.use(express.json());


app.use("/api", router )
app.use("/", routers)

mongoose.connect(process.env.MONGODB)
.then(()=>app.listen(process.env.PORT))
.then(()=>console.log('Connected! Server is running on http://localhost:'+ process.env.PORT + '/api'))
.catch(err=> console.log(err));
