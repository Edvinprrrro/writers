import express from "express";
import {
  deleteUser,
  loginUser,
  registerUser,
} from "../controllers/userController";
import { authAccessJwtToken } from "../middleware/authAccessTokenMiddleware.ts";
import { sendTokens } from "../middleware/sendAccessAndRefreshTokens";

const router = express.Router();

router.post("/register", registerUser, sendTokens);
router.post("/login", loginUser, sendTokens);
router.delete("/delete", authAccessJwtToken, deleteUser);

export default router;
