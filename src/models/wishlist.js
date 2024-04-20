import mongoose from "mongoose";

const wishlist_schema = mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  product_id: {
    type: String,
    required: true,
  },
});

const Wishlist =
  mongoose.models.Wishlist || mongoose.model("Wishlist", wishlist_schema);

export default Wishlist;
