import mongoose from "mongoose";

function connectDB() {
   
    return new Promise((resolve, reject) => {
        if (mongoose.connections[0].readyState) {
            console.log("Already connected.");
            resolve(1);
        } else {
            mongoose.connect(process.env.MONGODB_URI);

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

export default connectDB;