const mongoose = require('mongoose');

function connectDB() {
   
    return new Promise((resolve, reject) => {
        if (mongoose.connections[0].readyState) {
            console.log("Already connected.");
            resolve(1);
        } else {
            mongoose.connect('mongodb+srv://pratikmishra1833:kZTpmzfsOJxe3yW4@cluster0.bzafbo5.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0', {});

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


const Product_Schema = mongoose.Schema({
    product_name: {
        type: String,
        required: true
    },
    product_description: {
        type: String,
        required: true
    },
    product_price: {
        type: String,
        required: true
    },
    product_image: {
        type: String,
        required: true
    },
    liked: {
        type: Boolean,
        required: true
    },
});

const Product = mongoose.models.Product || mongoose.model('Product', Product_Schema);

async function addProduct(product_name, product_description, product_price, product_image, liked) {
    const newProduct = new Product({
        product_name: product_name,
        product_description: product_description,
        product_price: product_price,
        product_image: product_image,
        liked: liked
    });

    return newProduct.save();
}


async function start(){
await connectDB();
for (let i = 0; i < 100; i++) {
    const liked = i % 2 === 0;
   const data =await  addProduct(`Product ${i}`, `Product ${i} description`, `${i * 100}`, 'https://woodmart.b-cdn.net/wp-content/uploads/2016/09/product-clock-1-3.jpg', liked);
    console.log(data);
}
}
start()