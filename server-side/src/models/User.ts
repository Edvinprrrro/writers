import mongoose, { Schema, Document } from "mongoose";

// Creating the interface for the user model
export interface IUser extends Document {
  email: string;
  passwordHash: string;
  username: string;
}

// Now create the actual user schema
const userSchema = new Schema<IUser>({
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
});

// Now create the user model
const User = mongoose.model<IUser>("User", userSchema);

export default User;
