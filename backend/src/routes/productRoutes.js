import express from "express";
import {
  handelImageUpload,
  AddNewProduct,
  AllProducts,
  editProducts,
  deleteProduct,
} from "../controller/admin/productController.js";
import upload from "../util/cloudinaryImage.js";

const router = express.Router();

router.post("/productImg", upload.single("productFile"), handelImageUpload);
router.post("/addProduct", AddNewProduct);
router.get("/allproducts", AllProducts)
router.put("/updateproduct/:id", editProducts)
router.delete("/deleteProduct/:id", deleteProduct);

export default router;
