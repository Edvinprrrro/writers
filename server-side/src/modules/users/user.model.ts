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
    username: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Creating the interface for the user model
export type UserDocument = Document & InferSchemaType<typeof userSchema>;

// Now create the user model
const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
