import express from "express";

const router = express.Router();

router.get('/', (req, res, next) => {
    res.send("this is home page");
});

export default router; 