import { UserDoc } from "documents/User";
import * as express from "express";
import { createProfile, getProfileByUserHandle } from "../middleware/Profile";
import * as passport from "passport";

const router = express.Router();

//Get single profile by handle
router.get(
  "/:handle/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return getProfileByUserHandle(req.params.handle)
      .then((response) => {
        return res.status(response.status).json(response);
      })
      .catch((err) => {
        res.json(err);
      });
  }
);

//Create profile
router.post(
  "/:handle/create-profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return createProfile(req.params.handle, req.user as UserDoc, req.body)
      .then((response) => {
        return res.status(response.status).json(response);
      })
      .catch((err) => {
        res.json(err);
      });
  }
);

export default router;
