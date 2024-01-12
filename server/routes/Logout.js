import express from "express";
import logout from "../controllers/Logout-controller.js";
import verifyToken from "../controllers/Verify-controller.js";

const router = express.Router();
 
router.get('/', (req, res) => {
    res.send("logout")
});   

router.get('/', verifyToken, logout);

export default router;