import mongoose, { Schema } from "mongoose";

interface Chapter extends mongoose.Document {
  title: string;
  content: string;
  order: number;
  book: string;
}

// Creating the actual chapter schema
const chapterSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<Chapter>("Chapter", chapterSchema);
