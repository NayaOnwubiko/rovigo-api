import mongoose from "mongoose";
const { Schema } = mongoose;

const tripSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Trip", tripSchema);
