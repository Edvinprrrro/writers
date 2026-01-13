import mongoose, { Schema } from "mongoose";

interface PlotPoint extends mongoose.Document {
  title: string;
  content: string;
  order: number;
  book: string;
}

const plotPointSchema = new Schema(
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
    },
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<PlotPoint>("PlotPoint", plotPointSchema);
