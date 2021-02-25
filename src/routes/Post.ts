import * as express from "express";
import * as passport from "passport";
import { createPost } from "../middleware/Post";
import { UserDoc } from "../documents/User";

const router = express.Router();

//Create Post
router.post(
  "/create-post",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return createPost(
      req.user as UserDoc,
      req.body.postTitle,
      req.body.postBody
    )
      .then((response) => {
        return res.status(response.status).json(response);
      })
      .catch((err) => {
        return res.json(err);
      });
  }
);

export default router;
