const mongoose = require("mongoose");
const Product = require("./show_product");
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

const SomethingNew_schema = new mongoose.Schema([
  {
    hotImages: {
      type: String,
      required: true,
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  },
]);

const SomethingNew =
  mongoose.models.SomethingNew ||
  mongoose.model("SomethingNew", SomethingNew_schema);

const noOfData = 2;
async function start() {
  await connectDB();
  const data = await Product.find({});
  let somethingData = [];
  for (let i = data.length - noOfData; i < data.length; i++) {
    somethingData.push({
      hotImages: data[i].colorInfo[0].color_image[0],
      product_id: data[i]._id,
    });
  }
  console.log("-----------------------------------");

  const new_data = await SomethingNew.insertMany(somethingData);
  console.log(new_data);
  // const new_data = new SomethingNew(somethingData[0]);
  // const saved_data = await new_data.save();
  // console.log(saved_data);
}

// start();

export default SomethingNew;
