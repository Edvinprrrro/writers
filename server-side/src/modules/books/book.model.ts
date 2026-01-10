import mongoose, { Schema } from "mongoose";

interface Book extends mongoose.Document {
  title: string;
  description: string;
  author: string;
}

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

export default mongoose.model<Book>("Book", bookSchema);
