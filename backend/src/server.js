import express from "express";
import cors from "cors";
import authRouter from "./routes/authRoutes.js"
import adminProductsRouter from "./routes/productRoutes.js"
import PublicFilterProductRouter from "./routes/Publics/FilterProductRoutes.js"
import PublicCartRouter from "./routes/Publics/CartRoutes.js"
import AddressRouter from "./routes/Publics/AddressRoutes.js"
import ReviewRouter from "./routes/Publics/ReviewRoutes.js"
import { connectdb } from "./config/databaseUrl.js";
import dotenv from "dotenv"

dotenv.config()

const app = express();
const PORT = process.env.PORT || 8000;

app.use(
  cors({
    origin: process.env.FRONTEND_BASE_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/admin", adminProductsRouter);
app.use("/api/public", PublicFilterProductRouter);
app.use("/api/cart", PublicCartRouter);
app.use("/api/address", AddressRouter)
app.use("/api/review", ReviewRouter);

connectdb().then(() => {
   console.log("mongodb is connected")
   app.listen(PORT, () => console.log(`sever is running on ${PORT}`));
}).catch((error) => {
  console.error("Failed to connect to MongoDB:", error.message);
}) 

