import kafkaConfig from "../config/kafka.config.js";
import postSchema from "../model/post.schema.js";

const init = async () => {
  let messages = [];
  let processing = false;

  try {
    kafkaConfig.subscribe("post");

    kafkaConfig.run((message) => {
      try {
        // if (message.value) {
        //   const parsedMessage = JSON.parse(message.value);
        //   messages.push(parsedMessage);
        // } else {
        //   console.warn("Received message with undefined value: ", message);
        // }
        console.log(message);
        const m = JSON.parse(message);
        messages.push(m);

        if (messages.length >= 100 && !processing) {
          processing = true;
          processMessages();
        }
      } catch (error) {
        console.error("Error processing Kafka message: ", error.message);
      }
    });

    setInterval(() => {
      processing = true;
      processMessages();
    }, 5000);
  } catch (error) {
    console.error("Error initializing services: ", error);
  }

  const processMessages = async () => {
    try {
      const batch = [...messages];
      console.log(batch);
      const result = await postSchema.insertMany(batch);
      console.log("Messages processed and saved: ", result);
      messages.length = 0;
    } catch (error) {
      console.error("Error processing messages: ", error);
      messages.push(...batch);
    } finally {
      processing = false;
    }
  };
};

export default init;
