import express from "express"
import { addReviewRating, getReviewRating } from "../../controller/Publics/reviewControllers.js"

const router = express.Router()

router.post("/addrating", addReviewRating)
router.get("/getrating/:productId", getReviewRating)

export default router 
