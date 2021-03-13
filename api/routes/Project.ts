import express from "express";
import passport from "passport";
import {
  createProject,
  deleteProject,
  getProject,
  getProjects,
  getProjectsFromOneUser,
  updateProject,
} from "../middleware/Project";
import { UserDoc } from "../documents/User";
import { getAllPosts } from "../middleware/Post";

const router = express.Router();

// Create project
router.post(
  "/create-project",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return createProject(req.user as UserDoc, req.body)
      .then((response) => {
        return res.status(response.status).json(response);
      })
      .catch((err) => {
        res.json(err);
      });
  }
);

// Get all projects
router.get(
  "/projects",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return getProjects()
      .then((response) => {
        return res.status(response.status).json(response);
      })
      .catch((err) => {
        res.json(err);
      });
  }
);

// Get all projects from a user
router.get(
  "/:handle/projects",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return getProjectsFromOneUser(req.params.handle)
      .then((response) => {
        return res.status(response.status).json(response);
      })
      .catch((err) => {
        res.json(err);
      });
  }
);

// Get single projects for user
router.get(
  "/:project_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return getProject(req.params.project_id)
      .then((response) => {
        res.status(response.status).json(response);
      })
      .catch((err) => {
        res.json(err);
      });
  }
);

// Update project
router.put(
  "/:project_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return updateProject(req.params.project_id, req.user as UserDoc, req.body)
      .then((response) => {
        res.status(response.status).json(response);
      })
      .catch((err) => {
        res.json(err);
      });
  }
);

// Delete project
router.delete(
  "/:project_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return deleteProject(req.params.project_id, req.user as UserDoc)
      .then((response) => {
        res.status(response.status).json(response);
      })
      .catch((err) => {
        res.json(err);
      });
  }
);

export default router;
