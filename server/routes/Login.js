import express from "express";
import login from "../controllers/Login-controller.js";

const router = express.Router();

router.post('/', login);

export default router;

