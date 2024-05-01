import mongoose from "mongoose";

// adding created at
const user_schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Wishlist" }],
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cart" }],
  orders: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    unique: true, // Ensures array contains unique elements
  },
  address: {
    type: Array,
  },
});

const User = mongoose.models.User || mongoose.model("User", user_schema);

export default User;
