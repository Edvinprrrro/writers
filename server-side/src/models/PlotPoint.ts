import mongoose, { Schema, InferSchemaType } from "mongoose";
import { Document } from "mongoose";

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

export type IPlotPoint = Document & InferSchemaType<typeof plotPointSchema>;

const PlotPoint = mongoose.model<IPlotPoint>("PlotPoint", plotPointSchema);

export default PlotPoint;
