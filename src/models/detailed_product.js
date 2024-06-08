import mongoose from "mongoose";
import { type } from "os";

const Product_all = mongoose.Schema(
  {
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
    product_images: {
      type: Array,
      required: true,
    },
    product_category: {
      type: String,
      required: true,
    },
    product_rating: {
      type: Number,
      required: true,
    },
    product_reviews: {
      type: Array,
      required: true,
    },
    additional_info: {
      type: Array,
    },
    colors: {
      type: Array,
    },
    sizes: {
      type: Array,
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
    colorInfo: [
      {
        color: {
          type: String,
          required: false,
        },
        color_image: {
          type: Array,
          required: false,
        },
      },
    ],
  },
  { timestamps: true }
);

const Detailed_product =
  mongoose.models.Detailed_product ||
  mongoose.model("Detailed_product", Product_all);
export default Detailed_product;
