import express from "express"
import { createAddress, fetchAddress, editAddress, deleteAddress } from "../../controller/Publics/addressControllers.js";

const router = express.Router()


router.post("/add", createAddress);
router.get("/:userId", fetchAddress);
router.put("/edit/:userId/:addressId", editAddress);
router.delete("/delete/:userId/:addressId", deleteAddress)

export default router; 