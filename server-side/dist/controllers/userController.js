"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_KEY = process.env.JWT_KEY;
if (!JWT_KEY) {
    throw new Error("Missing JWT_KEY environment variable");
}
const registerUser = async (req, res, next) => {
    const { email, username, password } = req.body;
    // Check if all the fields are sent
    if (!email || !username || !password) {
        return res
            .status(400)
            .json({ error: "Missing fields to register a valid user" });
    }
    // Check if the email is already being used
    const existingEmail = await User_1.default.findOne({ email: email });
    if (existingEmail != null) {
        return res.status(400).json({ error: "Email already being used" });
    }
    // Check if the username is taken
    const existingUsername = await User_1.default.findOne({ username: username });
    if (existingUsername != null) {
        return res.status(400).json({ error: "Username already taken" });
    }
    // Encrypt the password
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
const loginUser = async (req, res, next) => {
    const { password, username } = req.body;
    // Check if all fields are sent
    if (!password || !username) {
        return res.status(400).json({ error: "Missing fields" });
    }
    // Check if user exists by that username
    const user = await User_1.default.findOne({ username: username });
    if (!user) {
        return res
            .status(400)
            .json({ error: "User not found, incorrect username" });
    }
    // Check if password is correct
    const isPasswordCorrect = await bcrypt_1.default.compare(password, user.passwordHash);
    if (!isPasswordCorrect) {
        return res.status(400).json({ error: "Incorrect paswword" });
    }
    // Sign the user in by sending the jwt token
    const payload = { id: user._id.toString(), username: user.username };
    const token = jsonwebtoken_1.default.sign(payload, JWT_KEY, { expiresIn: "2d" });
    return res
        .status(200)
        .json({ message: "Succesfully signed in", token: token });
};
exports.loginUser = loginUser;
