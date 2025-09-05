import dotenv from "dotenv";
dotenv.config();

import express from "express";
import userRoutes from "./routes/userRoutes";
import bookRoutes from "./routes/bookRoutes";
import { connectDb } from "./db";

const app = express();

const port = 3000;

app.use(express.json());

app.use("/user", userRoutes);
app.use("/books", bookRoutes);

async function startServer() {
  await connectDb();
  app.listen(port, () => {
    console.log(`App running here: http://localhost:${port}`);
  });
}

startServer();
