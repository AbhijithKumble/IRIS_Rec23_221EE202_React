//modules
import  express  from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import cors from "cors";
import crypto from "crypto";

// pages
import homeRouter from "./routes/home/Home.js";
import authRouter from "./routes/auth/Auth.js";
import logoutRouter from "./routes/logout/Logout.js";
import { start } from "repl";

config();


const app = express();

app.use(cors()); //allow cross origin reqs
app.use(express.json());  

const PORT = process.env.PORT || 5000;      //backend port 


const MONGODB_URI=process.env['MONGODB_URI'];

const connectDB = async (MONGODB_URI) => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log(`Connected to MongoDB`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};

connectDB(MONGODB_URI);  //connect the database

const server = app.listen(PORT);

//routes
app.use('/home',cors() ,homeRouter);
app.use('/login',cors(), authRouter);
app.use('/logout', cors(), logoutRouter);

//
const hashPasswordWithSalt = (password, salt) => {
  const hashedPassword = crypto.pbkdf2Sync(
    password,
    salt,
    10000, // Number of iterations
    64, // Key length
    'sha512' // Hashing algorithm
  ).toString('hex');

  return hashedPassword;
}

// search the database 

async function readLoginInfoFromDatabases(username, password) {
  try {

    const loginDB = mongoose.connection.getClient().db('iris-service-req');
    const collection = loginDB.collection('login-info');

    try{
      const data = await collection.find({username}).toArray();
      const hashing =  hashPasswordWithSalt(password, data[0].salt);

      const check = (hashing === data[0].hashedPassword);

      if(check) {
        return ({"status": "success", "role" :data[0].role});
      }
      else {
        return ("unauthenticated");
      }

    }
    catch(error) {
      console.log(error.message);
    }  
  } catch (error) {
    console.error('Error:', error);
  
  }  // } finally {
  //   await mongoose.connection.close();
  // }
}

app.post('/login', async (req, res) => {
  const {username, password } = req.body;
  const response = await readLoginInfoFromDatabases(username, password);

  res.send(response);
});

app.get('/logout', async(req, res) => {
  try {
    res.redirect('/login');   
  } catch (err) {
    console.error('Error during logout:', err);
    res.status(500).send('Error during logout');
  }

});











