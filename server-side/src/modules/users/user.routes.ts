import express from "express";
import { deleteUser, loginUser, registerUser } from "./user.controller";
import { authenticateAccessToken } from "../../middleware/authenticateAccessToken";
import { validateRequest } from "../../middleware/validateRequest";
import { loginUserSchema, registerUserSchema } from "./user.schemas";

const router = express.Router();

router.post("/register", validateRequest(registerUserSchema), registerUser);
router.post("/login", validateRequest(loginUserSchema), loginUser);
router.delete("/delete", authenticateAccessToken, deleteUser);

export default router;
