import dotenv from "dotenv";
import  express from 'express'
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser'


import authRoutes from "./routes/auths.js";
import userRoutes from "./routes/users.js";

import tweetRoutes from "./routes/tweets.js";
import commentRoutes from "./routes/comments.js";

import cors from "cors"


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

dotenv.config();

const connect = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("connect to mongodb database");
    })
    .catch((err) => {
      throw err;
    });
};

app.use(cookieParser());
app.use(express.json());

app.use(cors()) 

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tweets", tweetRoutes);
app.use("/api/comments", commentRoutes);


app.listen(8801, () => {
  connect();
  console.log("Listening to port 8801");
});
