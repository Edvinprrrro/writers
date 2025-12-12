import mongoose from "mongoose";

const mongoUri = "mongodb://127.0.0.1:27017/writers";

export const connectDb = async (): Promise<void> => {
  try {
    await mongoose.connect(mongoUri);
    console.log("Succesfully connected to the database");
  } catch (error) {
    console.error("Failed connecting to the database, error: ", error);
    process.exit(1);
  }
};
