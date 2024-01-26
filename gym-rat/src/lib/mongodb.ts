import mongoose from "mongoose";

const connectMongoDB = async () => {
  //
  if (mongoose.connection.readyState === 1) {
    console.log("Mongoose is already connected to the database");
    // You can perform any additional checks or operations here
  } else {
    // If there is no previous connection, connect to the database
    mongoose
      .connect(
        process.env.MONGO as string,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        } as any
      )
      .then(() => {
        console.log("Mongoose is now connected to the database");
        // You can perform any additional operations after connecting here
      })
      .catch((err) => {
        console.error("Error connecting to the database", err);
      });
  }
};

export default connectMongoDB;
