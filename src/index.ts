import * as express from "express";
import * as mongoose from "mongoose";
import * as dotenv from "dotenv";
import * as bodyParser from "body-parser";
import * as passport from "passport";

import keys from "./config/Keys";

import userRoutes from "./routes/User";
import postRoutes from "./routes/Post";
import profileRoutes from "./routes/Profile";
import projectRoutes from "./routes/Project";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

async function main() {
  await mongoose
    .connect(keys.MongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => console.log("Database connected"))
    .catch((err) => {
      console.log(err);
    });

  app.use(passport.initialize());
  require("./config/passport")(passport);

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use("/api/user", userRoutes);
  app.use("/api/post", postRoutes);
  app.use("/api/profile", profileRoutes);
  app.use("/api/project", projectRoutes);

  await app.get("/", (_, res) => {
    res.send("Welcome");
  });

  await app.listen(PORT, () => {
    console.log(`App is running on: http://localhost:${PORT}`);
  });
}
main();
