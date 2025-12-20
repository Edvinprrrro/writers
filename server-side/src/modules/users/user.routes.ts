import express from "express";
import { deleteUser, loginUser, registerUser } from "./user.controller";
import { authenticateAccessToken } from "../../middleware/authenticateAccessToken";
import { sendTokens } from "../../middleware/sendAccessAndRefreshTokens";

const router = express.Router();

router.post("/register", registerUser, sendTokens);
router.post("/login", loginUser, sendTokens);
router.delete("/delete", authenticateAccessToken, deleteUser);

export default router;
