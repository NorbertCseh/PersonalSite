import * as express from 'express';
import * as mongoose from "mongoose";
import * as dotenv from "dotenv";
import * as cors from "cors";
import * as passport from "passport";

import userRoutes from "./routes/User";
import postRoutes from "./routes/Post";
import profileRoutes from "./routes/Profile";
import projectRoutes from "./routes/Project";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());

async function main() {
  await mongoose
    .connect(process.env.MongoURI as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => console.log("Database connected"))
    .catch((err) => {
      console.log(err);
    });

  app.use(passport.initialize());
  const passportConf = require("./config/Passport")
  passportConf(passport)

  app.use(express.json())

  app.use("/api/user", userRoutes);
  app.use("/api/post", postRoutes);
  app.use("/api/profile", profileRoutes);
  app.use("/api/project", projectRoutes);

  app.get("/", (_: any, res: any) => {
    res.send("Welcome");
  });

  await app.listen(PORT, () => {
    console.log(`App is running on: http://localhost:${PORT}`);
  });
}
main();

module.exports = app
