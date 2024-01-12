import express from "express";
import login from "../controllers/Login-controller.js";

const router = express.Router();
 
router.get('/', (req, res) => {
    res.send("this is login")
});   

router.post('/', login);

export default router;

