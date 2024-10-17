import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(urlencoded());
app.use(express.static("public"));
app.use(cookieParser());

import { createPost } from "./services/post.services.js";

app.post("/post", createPost);

export { app };
