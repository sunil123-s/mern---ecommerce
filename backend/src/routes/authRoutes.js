import express from "express"
import { Signup, Login } from "../controller/auth/authControllers.js";

const router = express.Router();

router.post("/signUp", Signup);
router.post("/login", Login);

export default router