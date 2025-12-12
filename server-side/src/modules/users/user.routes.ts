import express from "express";
import { deleteUser, loginUser, registerUser } from "./user.controller";
import { authAccessJwtToken } from "../../middleware/authenticateAccessToken";
import { sendTokens } from "../../middleware/sendAccessAndRefreshTokens";

const router = express.Router();

router.post("/register", registerUser, sendTokens);
router.post("/login", loginUser, sendTokens);
router.delete("/delete", authAccessJwtToken, deleteUser);

export default router;
