import mongoose, { Schema, InferSchemaType } from "mongoose";
import { Document } from "mongoose";

const characterSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    role: {
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

export type ICharacter = Document & InferSchemaType<typeof characterSchema>;

const Character = mongoose.model<ICharacter>("Character", characterSchema);

export default Character;
