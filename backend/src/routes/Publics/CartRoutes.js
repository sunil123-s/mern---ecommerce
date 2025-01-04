import express from "express";
import { AddCartItems,CartItems,updateCartItems,deleteCartItems } from "../../controller/Publics/CartPorducts.js";
import { ProtectedRoute } from "../../middleware/authjwt.js";

const router = express.Router();

router.post("/add", ProtectedRoute, AddCartItems);
router.get("/:userId", ProtectedRoute, CartItems);
router.put("/updatecart", ProtectedRoute, updateCartItems);
router.delete("/:userId/:productId", ProtectedRoute, deleteCartItems);


export default router;
