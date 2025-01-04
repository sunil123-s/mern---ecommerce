import express from "express";
import {filteredProduct,productDetails } from "../../controller/Publics/shopProductController.js";
import { ProtectedRoute } from "../../middleware/authjwt.js";

const router = express.Router();

router.get("/allproducts", ProtectedRoute, filteredProduct);
router.get("/productdetails/:id", ProtectedRoute, productDetails);


export default router;
