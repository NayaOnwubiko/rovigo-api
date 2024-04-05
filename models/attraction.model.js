import mongoose from "mongoose";
const { Schema } = mongoose;

const attractionSchema = new Schema(
  {
    tripId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    website: {
      type: String,
    },
    photo: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Attraction", attractionSchema);
