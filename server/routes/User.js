import express from "express";
import getUser from "../controllers/Getuser-controller.js";
import verifyToken from "../controllers/Verify-controller.js";

const router = express.Router();
 
router.get('/',verifyToken, getUser);

export default router;