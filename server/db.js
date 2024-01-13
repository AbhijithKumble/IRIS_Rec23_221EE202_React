import mongoose from "mongoose";

const connectDB = async (MONGODB_URI, PORT) => {
    mongoose.connect(MONGODB_URI)
    .then((response) => {
        // console.log(response);
        console.log(`Databse is connected! Listening to port ${PORT}`);    
    }).catch((err) => {
        console.log(err);
    });
};

export default connectDB;