import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO as string,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      } as any
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDB;
