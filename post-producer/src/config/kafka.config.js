import pkg from "kafkajs";
const { Kafka, logLevel } = pkg;

class KafkaConfig {
  constructor() {
    this.kafka = new Kafka({
      clientId: "post-producer",
      brokers: ["192.168.29.65:9092"],
      logLevel: logLevel.ERROR,
    });
    this.admin = this.kafka.admin();
    this.producer = this.kafka.producer();
  }

  async connect() {
    try {
      await this.producer.connect();
      await this.admin.connect();
      console.log("Connected to Kafka producer and admin");
    } catch (error) {
      console.error("Error connecting to Kafka producer/admin: ", error);
    }
  }

  async createTopic(topic) {
    try {
      await this.admin.createTopics({
        topics: [{ topic, numPartitions: 1 }],
      });
      console.log(`Created topic: ${topic}`);
    } catch (error) {
      console.error("Error creating topic: ", error);
    }
  }

  async sendToTopic(topic, messages) {
    try {
      await this.producer.send({
        topic,
        messages: [{ value: JSON.stringify(messages) }],
      });
      console.log("Message sent successfully");
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  }

  async disconnect() {
    try {
      await this.producer.disconnect();
      await this.admin.disconnect();
      console.log("Disconnected from Kafka producer and admin");
    } catch (error) {
      console.error("Error disconnecting from Kafka producer/admin: ", error);
    }
  }
}

export default new KafkaConfig();
