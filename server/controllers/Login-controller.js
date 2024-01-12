import mongoose from "mongoose";
import hashPasswordWithSalt from "../helpers/hashPassword.js";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
    const {username, password } = req.body;

    let existingUser;
    let loginDB;
    let collection;


    loginDB = mongoose.connection.getClient().db('iris-service-req');
    collection = loginDB.collection('login-info');  //collection used to store login-info
     
    try{
        existingUser = await collection.findOne({username});
    } catch(error) {
        return new Error(error);
    }  

    if(!existingUser) {
        return res.status(400).json({
            message: "User not found in the college database"
        });
    }

    const isPasswordCorrect =  (hashPasswordWithSalt(password, existingUser.salt) === existingUser.hashedPassword);

    if (!isPasswordCorrect) {
        return res.status(400).json({ 
            message: "Inavlid username / password" 
        });
    }

    const token = jwt.sign({ id: existingUser._id }, String(process.env.JWT_SECRET_KEY), {
        expiresIn: "3600s",
    });

    console.log("Generated Token\n", token);
    
    if (req.cookies[`${existingUser._id}`]) {
        req.cookies[`${existingUser._id}`] = "";
    }

    res.cookie(String(existingUser._id), token, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 3600), // 1 hr 
        httpOnly: true,
        sameSite: "lax",
    });
    
    return res
        .status(200)
        .json({ 
            message: "Successfully Logged In", 
            user: {
                username : username,
                password:password
            }, 
            role : existingUser.role,
            token 
        });
};

export default login;