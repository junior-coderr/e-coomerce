import mongoose from "mongoose";

const order_schema = mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  product_id: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Order = mongoose.models.Order || mongoose.model("Order", order_schema);

export default Order;
