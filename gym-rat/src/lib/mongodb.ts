import mongoose from "mongoose";

const connectMongoDB = async () => {
  //
  if (mongoose.connection.readyState === 1) {
    // console.log("Mongoose is already connected to the database");
    // You can perform any additional checks or operations here
  } else {
    mongoose.connect(process.env.MONGO as string).catch((err) => {
      console.error("Error connecting to the database", err);
    });
  }
};

export default connectMongoDB;
