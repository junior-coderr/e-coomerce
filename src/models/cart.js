import mongoose from "mongoose";

const cart_schema = mongoose.Schema(
  {
    // user_id: {
    //   type: String,
    //   required: true,
    // },
    product_id: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    price: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
    },
    size: {
      type: String,
    },
    specifics: [
      {
        color: {
          type: Boolean,
          required: false,
          default: false,
        },
        size: {
          type: Boolean,
          required: false,
          default: false,
        },
      },
    ],
  },
  { timestamps: true }
);

const Cart = mongoose.models.Cart || mongoose.model("Cart", cart_schema);

export default Cart;
