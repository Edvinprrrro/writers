import mongoose, { Schema } from "mongoose";

interface Character extends mongoose.Document {
  name: string;
  description: string;
  narrativeRole: string;
  books: string[];
}

const characterSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    narrativeRole: {
      type: String,
    },
    books: [
      {
        type: Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<Character>("Character", characterSchema);
