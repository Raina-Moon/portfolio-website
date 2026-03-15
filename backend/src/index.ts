import express from "express";
import troubleshootingRoutes from "./routes/troubleshooting";
import contactRoutes from "./routes/contact";
import cors from "cors";

const app = express();
const port = process.env.PORT || 5000;
const allowedOrigins = (process.env.CORS_ORIGIN ?? "https://raina-moon.com,http://localhost:4321")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/troubleshooting", troubleshootingRoutes);
app.use("/api/contact", contactRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
