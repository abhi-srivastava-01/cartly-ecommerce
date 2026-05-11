import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { GlobalErrors } from "./middlewares/GlobalErrors.js";


const app = express();


// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.static("uploads"));




// Routes 
import userRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";


app.get('/', (req, res)=>{
    res.send("Hello Worls")
})
app.use("/api/auth", userRoutes);
app.use("/api/products", productRoutes);


// Global error handling middleware
app.use(GlobalErrors);


export { app };
