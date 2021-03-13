import express from "express";
import passport from "passport";
import {
  createPost,
  deletePost,
  getAllPosts,
  getSinglePost,
  updatePost,
  createComment,
} from "../middleware/Post";
import { UserDoc } from "../documents/User";

const router = express.Router();

// Create Post
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

// Get All post
router.get(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return getAllPosts()
      .then((response) => {
        return res.status(response.status).json(response);
      })
      .catch((err) => {
        return res.json(err);
      });
  }
);

// Get single post
router.get(
  "/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return getSinglePost(req.params.post_id)
      .then((response) => {
        return res.status(response.status).json(response);
      })
      .catch((err) => {
        return res.json(err);
      });
  }
);

// Update post
router.put(
  "/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return updatePost(req.params.post_id, req.body, req.user as UserDoc)
      .then((response) => {
        return res.status(response.status).json(response);
      })
      .catch((err) => {
        return res.json(err);
      });
  }
);

// Delete post
router.delete(
  "/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return deletePost(req.params.post_id, req.user as UserDoc)
      .then((response) => {
        return res.status(response.status).json(response);
      })
      .catch((err) => {
        return res.json(err);
      });
  }
);
export default router;

router.post(
  "/:post_id/comment",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return createComment(
      req.params.post_id,
      req.user as UserDoc,
      req.body.commentBody
    )
      .then((response) => {
        return res.status(response.status).json(response);
      })
      .catch((err) => {
        return res.json(err);
      });
  }
);
