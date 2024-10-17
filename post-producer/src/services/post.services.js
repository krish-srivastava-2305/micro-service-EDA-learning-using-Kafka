import kafkaConfig from "../config/kafka.config.js";

export const createPost = async (req, res) => {
  try {
    const { title, content } = await req.body;
    const post = { title, content };
    const stringified = JSON.stringify(post);
    const kafkaRes = await kafkaConfig.producer.send({
      topic: "post",
      messages: [{ value: stringified }],
    });

    res.status(201).json(JSON.parse(stringified));
  } catch (error) {
    console.error("Error creating post: ", error);
    res.status(500).json({ message: "Error creating post" });
  }
};
