import express from "express"
import { createAddress, fetchAddress, editAddress, deleteAddress } from "../../controller/Publics/addressControllers.js";
import { ProtectedRoute } from "../../middleware/authjwt.js";

const router = express.Router()

router.post("/add", ProtectedRoute, createAddress);
router.get("/:userId", ProtectedRoute, fetchAddress);
router.put("/edit/:userId/:addressId", ProtectedRoute, editAddress);
router.delete("/delete/:userId/:addressId", ProtectedRoute, deleteAddress);

export default router; 