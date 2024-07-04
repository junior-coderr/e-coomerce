import mongoose from "mongoose";

const Product_Schema = mongoose.Schema(
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
          required: true,
        },
      },
    ],
    delivery_charges: [
      {
        country: {
          type: String,
          required: true,
        },
        base_charge: {
          type: Number,
          required: true,
        },
        increment: {
          type: Number,
          required: true,
        },
      },
    ],
    delivery_time: [
      {
        country: {
          type: String,
          required: true,
        },
        time: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", Product_Schema);

export default Product;
