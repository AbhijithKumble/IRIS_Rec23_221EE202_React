import jwt from "jsonwebtoken";


const refreshToken = (req, res, next) => {
  console.log(req.headers);
    const cookies = req.headers.cookie;
    const prevToken = cookies ? cookies.split("=")[1] : null;
    console.log(`this is cookie : ${cookies}`);
    console.log(`\n this is prev token: ${prevToken}`);

    if (!prevToken) {
      return res.status(400).json({ message: "Couldn't find token" });
    }

    jwt.verify(String(prevToken), process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(403).json({ message: "Authentication failed" });
      }
      console.log(user.id);
      res.clearCookie(`${user.id}`);
      req.cookies[`${user.id}`] = "";
  
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "35s",
      });

      console.log("Regenerated Token\n", token);
  
      res.cookie(String(user.id), token, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 35), // 35 seconds
        httpOnly: true,
        sameSite: "lax",
        secure:true,
      });
  
      req.id = user.id;
      next();
      
    });
  };
  
export default refreshToken;