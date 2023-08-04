import mongoose from "mongoose";
const { Schema } = mongoose;

const restaurantSchema = new Schema(
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
    rankingCategory: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Restaurant", restaurantSchema);
