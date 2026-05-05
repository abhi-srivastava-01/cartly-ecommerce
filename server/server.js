import dotenv from "dotenv";
dotenv.config();


// sync error handling
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:", err);
  process.exit(1);
});

// async error handling
process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION:", err);
  server.close(() => process.exit(1))
});


import http from "http";
import { app } from "./src/app.js";
import { connectDB } from "./src/config/db.js";

let server;
const PORT = process.env.PORT || 5000;


// DB connection and server startup
const startServer = async () => {
  try {
    await connectDB();

    server = http.createServer(app);

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`Server startup error: ${error.message}`);
    process.exit(1);
  }
};

startServer();
