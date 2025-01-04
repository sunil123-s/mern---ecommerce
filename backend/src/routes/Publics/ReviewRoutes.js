import express from "express"
import { addReviewRating, getReviewRating } from "../../controller/Publics/reviewControllers.js"
import { ProtectedRoute } from "../../middleware/authjwt.js";

const router = express.Router()

router.post("/addrating", ProtectedRoute, addReviewRating);
router.get("/getrating/:productId", ProtectedRoute, getReviewRating);

export default router 
