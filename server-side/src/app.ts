import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import userRoutes from "./modules/users/user.routes";
import bookRoutes from "./modules/books/book.routes";
import chapterRoutes from "./modules/chapters/chapter.routes";
import { connectDb } from "./config/db";
import { verifyRefreshToken } from "./controllers/verifyRefreshToken";
import { sendTokens } from "./middleware/sendAccessAndRefreshTokens";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);
app.use("/books", bookRoutes);
app.use("/books/:bookId/chapters", chapterRoutes);
app.post("/refreshTokens", verifyRefreshToken, sendTokens);

app.use(errorHandler);

async function startServer() {
  await connectDb();
  app.listen(port, "0.0.0.0", () => {
    console.log(`App running here: http://localhost:${port}`);
  });
}

startServer();
