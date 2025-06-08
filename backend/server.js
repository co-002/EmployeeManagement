import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.js";
import { dbConnect } from "./config/dbConnection.js";
import employeeRouter from "./routes/employee.js";
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();

// Middlewares
dotenv.config();
dbConnect();
const port = process.env.PORT || 3000;
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "PUT", "POST", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type"]
}))
app.use(express.json());
app.use(cookieParser());

// Routers
app.use("/user", userRouter);
app.use("/employee", employeeRouter)

app.listen(port, () => {
  console.log("Server is running");
});
