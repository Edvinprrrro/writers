import mongoose, { Schema, InferSchemaType } from "mongoose";
import { Document } from "mongoose";

// Schema
const refreshTokenSchema = new Schema({
  token: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  revoked: {
    type: Boolean,
    default: false,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

export type IRefreshToken = Document &
  InferSchemaType<typeof refreshTokenSchema>;

const RefreshToken = mongoose.model<IRefreshToken>(
  "RefreshToken",
  refreshTokenSchema
);

export default RefreshToken;
