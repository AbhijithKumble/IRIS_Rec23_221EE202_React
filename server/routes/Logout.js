import express from "express";
import logout from "../controllers/Logout-controller.js";
import verifyToken from "../controllers/Verify-controller.js";

const router = express.Router();

router.post('/', verifyToken, logout);

export default router;