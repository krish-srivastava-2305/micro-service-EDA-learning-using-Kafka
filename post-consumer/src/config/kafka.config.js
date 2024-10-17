import pkg from "kafkajs";
const { Kafka, logLevel } = pkg;

class KafkaConfig {
  constructor() {
    this.kafka = new Kafka({
      clientId: "post-consumer",
      brokers: ["192.168.29.65:9092"],
      logLevel: logLevel.ERROR,
    });
    this.consumer = this.kafka.consumer({ groupId: "test-group" });
  }

  async connect() {
    try {
      await this.consumer.connect();
      console.log("Connected to Kafka consumer");
    } catch (error) {
      console.error("Error connecting to Kafka consumer: ", error);
    }
  }

  async subscribe(topic) {
    try {
      await this.consumer.subscribe({ topic, fromBeginning: true });
      console.log(`Subscribed to topic: ${topic}`);
    } catch (error) {
      console.error("Error subscribing to topic: ", error);
    }
  }

  async run(callback) {
    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          value: message.value.toString(),
        });
        callback(message.value.toString());
      },
    });
  }

  async disconnect() {
    try {
      await this.consumer.disconnect();
      console.log("Disconnected from Kafka consumer");
    } catch (error) {
      console.error("Error disconnecting from Kafka consumer: ", error);
    }
  }
}

export default new KafkaConfig();
