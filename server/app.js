import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
  "https://chatter-box-web06.netlify.app",
  "http://localhost:5173",
  "http://localhost:8080",
  "http://192.168.31.150:8080"
];

app.use(cors({
  origin: function (origin, callback) {
    console.log("🛰️ Incoming origin:", origin);
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options(/.*/, cors()); // ✅ This works in Express 5+

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

app.use("/api/users", userRoutes);

app.get("/", (req, res) => res.send("API is running ✅"));

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
