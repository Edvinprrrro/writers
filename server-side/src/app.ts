import express from "express";
import userRoutes from "./routes/userRoutes";
import { connectDb } from "./db";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/user", userRoutes);

async function startServer() {
  await connectDb();
  app.listen(port, () => {
    console.log(`App running here: http://localhost:${port}`);
  });
}

startServer();
