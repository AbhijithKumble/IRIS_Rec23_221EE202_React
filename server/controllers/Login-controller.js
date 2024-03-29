import mongoose from "mongoose";
import hashPasswordWithSalt from "../helpers/hashPassword.js";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
    const {username, password } = req.body;

    let existingUser;
    let loginDB;
    let collection;


    try {
        loginDB = mongoose.connection.getClient().db('iris-service-req');
        collection = loginDB.collection('login-info');
        existingUser = await collection.findOne({ username });
    } catch (error) {
        console.error("An error occurred:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
    
    console.log(existingUser);

    if(!existingUser) {
        return res.status(400).json({
            message: "User not found in the college database"
        });
    }

    const isPasswordCorrect =  (hashPasswordWithSalt(password, existingUser.salt) === existingUser.hashedPassword);

    if (!isPasswordCorrect) {
        return res.status(401).json({ 
            message: "Inavlid username / password" 
        });
    }

    const token = jwt.sign(
        { id: existingUser._id }, 
        String(process.env.JWT_SECRET_KEY), {
        expiresIn: "35s",
    });

    console.log("Generated Token\n", token);
    
    if (req.cookies[`${existingUser._id}`]) {
        res.clearCookie(`${existingUser._id}`);
    }

    res.cookie(String(existingUser._id), token, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 35), // 35s
        httpOnly: true,
        sameSite: 'None',
        secure : true,
    });
    
    return res.status(200).json({ 
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