import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const cookies = req.headers.cookie;
    const token = cookies.split("=")[1];
    if (!token) {
      res.status(404).json({ 
        message: "No token found" 
      });
    }

    jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(400).json({
            message: "Invalid TOken" 
          });
      }
      req.id = user.id;
    
    });
    next();
  };
  
export default verifyToken;
