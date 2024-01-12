import express from "express";
import getUser from "../controllers/Getuser-controller.js";
import verifyToken from "../controllers/Verify-controller.js";
import refreshToken from "../controllers/Refresh-controller.js";


const router = express.Router();
 
router.get('/', (req, res) => {
    res.send("this is refresh")
});   

router.get('/',refreshToken,verifyToken, getUser);

export default router;