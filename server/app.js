import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

// ✅ CORS config
app.use(
  cors({
    origin: ["http://localhost:8080", process.env.FRONTEND_URL],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ✅ API
app.use("/api/users", userRoutes);

// Static files (only in production)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDistPath = path.join(__dirname, "../client/dist");
console.log("STATIC FILES FROM:", clientDistPath);

app.use(express.static(clientDistPath));

// ✅ Catch-all route — safe version with debug logging
app.get('/{*any}', (req, res, next) => {
  // If the request starts with /api, skip this route
  if (req.path.startsWith("/api")) return next();

  res.sendFile(path.join(clientDistPath, "index.html"));
});



// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
