import express from "express";
import {
  handelImageUpload,
  AddNewProduct,
  AllProducts,
  editProducts,
  deleteProduct,
} from "../controller/admin/productController.js";
import upload from "../util/cloudinaryImage.js";
import { ProtectedRoute } from "../middleware/authjwt.js";

const router = express.Router();

router.post(
  "/productImg",
  ProtectedRoute,
  upload.single("productFile"),
  handelImageUpload
);
router.post("/addProduct", ProtectedRoute, AddNewProduct);
router.get("/allproducts", ProtectedRoute, AllProducts);
router.put("/updateproduct/:id", ProtectedRoute, editProducts);
router.delete("/deleteProduct/:id", ProtectedRoute, deleteProduct);

export default router;
