import express from "express";
import {
  filteredProduct,
  productDetails,
} from "../../controller/Publics/shopProductController.js";

const router = express.Router();

router.get("/allproducts", filteredProduct);
router.get("/productdetails/:id", productDetails);


export default router;
