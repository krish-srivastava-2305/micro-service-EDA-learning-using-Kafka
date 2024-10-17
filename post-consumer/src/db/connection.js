import mongoose from "mongoose";

const connect = async () => {
  try {
    const res = await mongoose.connect("mongodb://localhost:27017/post");
    if (res.connection.readyState === 1) {
      console.log("Connected to MongoDB");
    }
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
  }
};

export default connect;
