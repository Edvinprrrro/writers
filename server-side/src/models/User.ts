import mongoose, { Schema, InferSchemaType } from "mongoose";
import { Document } from "mongoose";

// Now create the actual user schema
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

// Creating the interface for the user model
export type IUser = Document & InferSchemaType<typeof userSchema>;

// Now create the user model
const User = mongoose.model<IUser>("User", userSchema);

export default User;
