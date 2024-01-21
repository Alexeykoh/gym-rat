// import mongoose from "mongoose";

// const connection: any = {};

// const connectToDb = async () => {
//   try {
//     if (connection.isConnected) {
//       console.log("Using exist connection");
//       return;
//     }
//     const db = await mongoose.connect(process.env.MONGO);
//     connection.isConnected = db.connections[0].readyState;
//   } catch (err: any) {
//     console.log(err);
//     throw new Error(err);
//   }
// };

import mongoose from "mongoose";

interface ConnectionType {
  isConnected: boolean;
}

const connection: ConnectionType = {
  isConnected: false,
};

export const connectToDb = async () => {
  console.log("start connecting to db");
  try {
    if (connection.isConnected) {
      console.log("Using existing connection");
      return;
    }
    const mongoUri: any = process.env.MONGO;
    // const db = await mongoose.connect(mongoUri);

    //
    mongoose.connect(mongoUri).then((res) => {
      connection.isConnected = res.connections[0].readyState === 1;
      console.log("mongoose complete");
    });
  } catch (err: any) {
    console.log(err);
    throw new Error(err);
  }
};
