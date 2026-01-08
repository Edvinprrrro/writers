import mongoose, { Schema } from "mongoose";
import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";

interface User extends mongoose.Document {
  email: string;
  username: string;
  hash: string;
  salt: string;
  setPassword(password: string): void;
  generateJwt(): { token: string; expiry: Date };
  isPasswordValid(password: string): boolean;
}

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
    hash: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

class UserClass {
  private _id!: string;
  private email!: string;
  public username!: string;
  private salt!: string;
  private hash!: string;

  public setPassword(password: string) {
    this.salt = crypto.randomBytes(16).toString("hex");
    this.hash = crypto
      .pbkdf2Sync(password, this.salt, 100000, 512, "sha512")
      .toString("hex");
  }

  public generateJwt(): { token: string; expiry: Date } {
    const expiry = new Date();
    expiry.setHours(expiry.getHours() + 2);

    const token = jwt.sign(
      {
        _is: this._id,
        email: this.email,
        exp: Math.round(expiry.getTime() / 1000),
      },
      process.env.JWT_ACCESS_KEY!
    );

    return { token, expiry };
  }

  public isPasswordValid(password: string) {
    const hash = crypto
      .pbkdf2Sync(password, this.salt, 100000, 512, "sha512")
      .toString("hex");
    return hash === this.hash;
  }
}

userSchema.loadClass(UserClass);
export default mongoose.model<User>("User", userSchema);
