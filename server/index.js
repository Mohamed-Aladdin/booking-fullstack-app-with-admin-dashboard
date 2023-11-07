import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import { authRouter } from "./routes/auth.js";
import { userRouter } from "./routes/users.js";
import { hotelRouter } from "./routes/hotels.js";
import { roomRouter } from "./routes/rooms.js";

// Config environment variables
dotenv.config();

// Connect to the DB
connectDB();

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/hotels", hotelRouter);
app.use("/rooms", roomRouter);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () =>
  console.log(`${process.env.NODE_ENV} server started on port ${PORT}`)
);
