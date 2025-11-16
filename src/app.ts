import compression from "compression";
import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import { UserRouter } from "./modules/user/user.routes";
import { PostRouter } from "./modules/post/post.routes";
import { AuthRouter } from "./modules/auth/auth.routes";
import { ReviewRouter } from "./modules/review/review.routes";

const app = express();

// Middleware
app.use(cookieParser());
app.use(cors()); // Enables Cross-Origin Resource Sharing
app.use(compression()); // Compresses response bodies for faster delivery
app.use(express.json()); // Parse incoming JSON requests

// CORS Configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  })
);

// Route
app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/user", UserRouter);
app.use("/api/v1/post", PostRouter);
app.use("/api/v1/review", ReviewRouter);

// Default route for testing
app.get("/", (_req, res) => {
  res.send("API is running");
});

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

export default app;
