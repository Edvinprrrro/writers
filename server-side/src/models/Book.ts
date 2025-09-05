import mongoose, { Schema, InferSchemaType } from "mongoose";
import { Document } from "mongoose";

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Geth the book interface
export type IBook = Document & InferSchemaType<typeof bookSchema>;

const Book = mongoose.model<IBook>("Book", bookSchema);

export default Book;
