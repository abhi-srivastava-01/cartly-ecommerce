import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { GlobalErrors } from "./middlewares/GlobalErrors.js";


const app = express();


// Middlewares
app.use(
  cors({
    origin: process.env.FRONTED_URL,
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


app.get('/', (req, res)=>{
    res.send("Hello Worls")
})
app.use("/api/auth", userRoutes);


// Global error handling middleware
app.use(GlobalErrors);


export { app };
