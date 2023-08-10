import mongoose from "mongoose";
const { Schema } = mongoose;

const hotelSchema = new Schema(
  {
    tripId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
    },
    photo: {
      type: String,
    },
    rankingCategory: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Hotel", hotelSchema);
