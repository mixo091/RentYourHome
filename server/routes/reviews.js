import express from "express";
import { createReview } from "../controllers/reviews.js";

const router = express.Router();

router.post('/createReview', createReview);


export default router