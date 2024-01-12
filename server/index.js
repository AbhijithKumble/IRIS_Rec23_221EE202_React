//modules
import  express  from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

// routes
import loginRouter from "./routes/Login.js";
import homeRouter from "./routes/Home.js";
import refreshRouter from "./routes/Refresh.js";
import getUserRouter from "./routes/User.js";
import viewRouter from "./routes/View.js";
import createRouter from "./routes/Create.js"
import applyRouter from "./routes/Apply.js"
import logoutRouter from "./routes/Logout.js";

//helpers 

import connectDB from "./db.js";
import { get } from "mongoose";

// =====================================================================================================//
config();

const app = express();

const PORT = process.env.PORT || 5000;      //backend port 
const origin = `http://localhost:${PORT}/login`;

app.use(cors());             //allow cross origin reqs


app.use(express.json());  
app.use(cookieParser());


const MONGODB_URI=String(process.env['MONGODB_URI']);

connectDB(MONGODB_URI, PORT);  //connect the database
app.listen(PORT);

//routes
app.use('/login',cors(), loginRouter);
app.use('/home',homeRouter);
app.use('/refresh', refreshRouter);
app.use('/user', getUserRouter);
app.use('/view', viewRouter);
app.use('/apply', applyRouter);
app.use('/create', createRouter);
app.use('/logout', logoutRouter);








