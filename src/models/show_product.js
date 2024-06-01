import mongoose from "mongoose";

const Product_Schema = mongoose.Schema({
  product_name: {
    type: String,
    required: true,
  },
  product_description: {
    type: String,
    required: true,
  },
  product_price: {
    type: String,
    required: true,
  },
  product_image: {
    type: String,
    required: true,
  },
});

const Product =
  mongoose.models.Product || mongoose.model("Product", Product_Schema);
export default Product;
