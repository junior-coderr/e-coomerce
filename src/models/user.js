import mongoose, { set } from "mongoose";

// adding created at
const user_schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profile_image: {
      type: String,
      default: "",
    },
    // wishlist: {
    //   type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Wishlist" }],
    //   unique: true, // Ensures array contains unique elements
    //   default: [],
    // },
    cart: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cart" }],
      unique: true, // Ensures array contains unique elements
      default: [],
    },
    orders: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
      unique: true, // Ensures array contains unique elements
      default: [],
    },
    address: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", user_schema);

export default User;
