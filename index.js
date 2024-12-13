import http from "http";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./database/db.js";

dotenv.config();

// routes
import usersRoute from "./routes/users.js";
import pointsRoute from "./routes/points.js";

// define
const app = express();
const server = http.createServer(app);

// configs
const port = 8000 || process.env.PORT;

// use
app.use(express.json())
app.use(cors());

// Connect to MongoDB
connectDB();

// app routes
app.use("/users", usersRoute);
app.use("/points", pointsRoute);

server.listen(port, () => console.log("server is running...!"));