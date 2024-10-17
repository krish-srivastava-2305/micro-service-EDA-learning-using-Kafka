import { app } from "./app.js";
import kafkaConfig from "./config/kafka.config.js";
import connect from "./db/connection.js";
import init from "./services/post.services.js";

const PORT = 3001;

const startServer = async () => {
  try {
    await connect();
    console.log("Successfully connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });

    await kafkaConfig.connect();
    console.log("Kafka connected successfully");

    init();
  } catch (error) {
    console.error("Error initializing the server: ", error);
  }
};

startServer();

// const gracefulShutdown = async () => {
//   console.log("Shutting down gracefully...");

//   try {

//     await kafkaConfig.disconnect();
//     console.log("Kafka disconnected successfully");

//     await mongoose.connection.close();
//     console.log("MongoDB disconnected successfully");

//     process.exit(0);
//   } catch (error) {
//     console.error("Error during graceful shutdown: ", error);
//     process.exit(1);
//   }
// };
