"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoUri = "mongodb://127.0.0.1:27017/writers";
const connectDb = async () => {
    try {
        await mongoose_1.default.connect(mongoUri);
        console.log("Succesfully connected to the database");
    }
    catch (error) {
        console.error("Failed connecting to the database, error: ", error);
        process.exit(1);
    }
};
exports.connectDb = connectDb;
