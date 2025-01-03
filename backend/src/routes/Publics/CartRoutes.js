import express from "express";
import { AddCartItems,CartItems,updateCartItems,deleteCartItems } from "../../controller/Publics/CartPorducts.js";

const router = express.Router();

router.post("/add", AddCartItems);
router.get("/:userId", CartItems);
router.put("/updatecart", updateCartItems);
router.delete("/:userId/:productId", deleteCartItems);


export default router;
