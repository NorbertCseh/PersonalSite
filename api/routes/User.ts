import express from "express";
import {
  createUser,
  loginUser,
  editUser,
  getSingleUser,
  getAllUsers,
  // deleteUser,
} from "../middleware/User";

import passport from "passport";
import { UserDoc } from "../documents/User";

const router = express.Router();

// Register
router.post("/register", (req, res) => {
  return createUser(
    req.body.name,
    req.body.email,
    req.body.handle,
    req.body.password,
    req.body.avatar
  )
    .then((response) => {
      return res.status(response.status).json(response);
    })
    .catch((err) => {
      return res.json(err);
    });
});

// Login
router.post("/login", (req, res) => {
  return loginUser(req.body.email, req.body.password)
    .then((response) => {
      return res.status(response.status).json(response);
    })
    .catch((err) => {
      res.json(err);
    });
});

// Get all Users
router.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    return await getAllUsers()
      .then(async (response) => {
        return await res.status(response.status).json(response);
      })
      .catch((err) => {
        res.json(err);
      });
  }
);

// Get single User
router.get(
  "/:handle",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    return await getSingleUser(req.params.handle)
      .then(async (response) => {
        return await res.status(response.status).json(response);
      })
      .catch((err) => {
        res.json(err);
      });
  }
);

// Edit user
router.put(
  "/:handle",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    return await editUser(req.user as UserDoc, req.body, req.params.handle)
      .then(async (response) => {
        return await res.status(response.status).json(response);
      })
      .catch((err) => {
        res.json(err);
      });
  }
);

// Delete user
// router.delete(
//   "/:handle",
//   passport.authenticate("jwt", { session: false }),
//   async (req, res) => {
//     return await deleteUser(req.params.handle, req.user as UserDoc)
//       .then(async (response) => {
//         return res.status(response.status).json(response);
//       })
//       .catch((err) => {
//         res.json(err);
//       });
//   }
// );

export default router;
