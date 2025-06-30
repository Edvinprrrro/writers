"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
const registerUser = async (req, res, next) => {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
        return res
            .status(400)
            .json({ error: "Missing fields to register a valid user" });
    }
    const existingEmail = await User_1.default.findOne({ email: email });
    if (existingEmail != null) {
        return res.status(400).json({ error: "Email already being used" });
    }
    const existingUsername = await User_1.default.findOne({ username: username });
    if (existingUsername != null) {
        return res.status(400).json({ error: "Username already taken" });
    }
    const saltRounds = 10;
    const passwordHash = await bcrypt_1.default.hash(password, saltRounds);
    const user = new User_1.default({
        username,
        email,
        passwordHash,
    });
    await user.save();
    return res.status(201).json({ message: "User added succesfully" });
};
exports.registerUser = registerUser;
