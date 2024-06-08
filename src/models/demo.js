const mongoose = require("mongoose");

function connectDB() {
  return new Promise((resolve, reject) => {
    if (mongoose.connections[0].readyState) {
      console.log("Already connected.");
      resolve(1);
    } else {
      mongoose.connect(
        "mongodb+srv://pratikmishra1833:kZTpmzfsOJxe3yW4@cluster0.bzafbo5.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0",
        {}
      );

      mongoose.connection.on("connected", () => {
        console.log("Connected to MongoDB.");
        resolve(1);
      });

      mongoose.connection.on("error", (err) => {
        console.log("Error connecting to MongoDB.");
        reject(err);
      });
    }
  });
}

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
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", Product_Schema);

async function addProduct(
  product_name,
  product_description,
  product_price,
  product_images,
  product_category,
  product_rating,
  product_reviews,
  additional_info,
  colors,
  sizes,
  specifics
) {
  const newProduct = new Product({
    product_name,
    product_description,
    product_price,
    product_images,
    product_category,
    product_rating,
    product_reviews,
    additional_info,
    colors,
    sizes,
    specifics,
  });

  return newProduct.save();
}

async function start() {
  await connectDB();
  for (let i = 0; i < 10; i++) {
    const data = await addProduct(
      `Product ${i}`,
      `Product ${i} description this product us very good and you should buy it.`,
      `${i * 100}`,
      [
        "https://woodmart.b-cdn.net/wp-content/uploads/2016/09/product-clock-1-3.jpg",
      ],
      "General",
      4.5,
      ["Good product", "Nice product", "Worth the price"],
      ["additional info"],
      ["red", "blue"],
      ["small", "medium", "large"],
      [{ color: true, size: true }]
    );
  }
}
start();
