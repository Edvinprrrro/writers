import express from "express";
import {
  deleteUser,
  loginUser,
  registerUser,
} from "../controllers/userController";
import { authJwtToken } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.delete("/delete", authJwtToken, deleteUser);

export default router;
