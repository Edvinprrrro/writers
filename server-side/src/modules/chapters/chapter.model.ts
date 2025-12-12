import mongoose, { Schema, InferSchemaType } from "mongoose";
import { Document } from "mongoose";

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

// Creating the interface for the chapter schema
export type IChapter = Document & InferSchemaType<typeof chapterSchema>;

// Now create the chapter model
const Chapter = mongoose.model<IChapter>("Chapter", chapterSchema);

export default Chapter;
