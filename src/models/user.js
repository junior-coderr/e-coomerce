import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  product_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  quantity: { type: Number, required: true },
  color: { type: String, required: true },
  size: { type: String, required: true },
});

const userSchema = new mongoose.Schema(
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
    cart: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        product_id: { type: mongoose.Schema.Types.ObjectId, default: null },
        quantity: { type: Number, default: 1 },
        color: { type: String, default: "" },
        size: { type: String, default: "" },
      },
    ],
    orders: [cartItemSchema],
    address: {
      type: Array,
      default: [],
    },
    currentOrder: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
