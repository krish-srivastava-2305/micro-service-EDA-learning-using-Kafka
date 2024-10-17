import kafkaConfig from "./kafka.config.js";

const startServices = async () => {
  try {
    await kafkaConfig.connect();
    await kafkaConfig.createTopic("post");
  } catch (error) {
    console.error("Error starting services: ", error);
    process.exit(1);
  }
};

export default startServices;
