import UserSchema from "../models/User";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import moment from "moment";
import { UserDoc } from "../documents/User";
import { responseJson } from "../helper/response";

export async function createUser(
  name: string,
  email: string,
  handle: string,
  password: string,
  avatar?: string
) {
  return await UserSchema.findOne({ email }).then(async (user) => {
    if (user) {
      return responseJson(400, "Email was already taken");
    } else {
      let hashedPassword;
      try {
        hashedPassword = await argon2.hash(password as string);
      } catch (error) {
        console.error(error);
      }
      const newUser = new UserSchema({
        name,
        email,
        handle,
        avatar,
        password: hashedPassword,
        isAdmin: false,
        registerDate: moment(),
        lastUpdatedDate: moment(),
      });

      return await newUser
        .save()
        .then((resUser) => {
          return responseJson(201, resUser);
        })
        .catch((err) => {
          return responseJson(400, err);
        });
    }
  });
}

export async function loginUser(email: string, password: string) {
  return await UserSchema.findOne({
    email,
  })
    .select("+password")
    .then(async (user) => {
      if (!user) {
        return responseJson(400, "Wrong email or password");
      } else {
        return await argon2
          .verify(user.password as string, password as string)
          .then(async (result) => {
            if (result) {
              const token = await jwt.sign(
                {
                  id: user._id,
                  name: user.name,
                  avatar: user.avatar,
                  isAdmin: user.isAdmin,
                },
                process.env.Key as string,
                {
                  expiresIn: 3600,
                }
              );
              return responseJson(
                200,
                "Access granted, now you are logged in.",
                "Bearer " + token
              );
            } else {
              return responseJson(400, "Wrong email or password");
            }
          });
      }
    });
}

export async function editUser(
  requestedUser: UserDoc,
  fieldsToEdit: UserDoc,
  handle: string
) {
  const requestedPerson = await UserSchema.findById(requestedUser._id).then(
    (user) => {
      return user;
    }
  );
  const userToEdit = await UserSchema.findOne({ handle }).then((user) => {
    return user;
  });
  if(userToEdit){

  if (JSON.stringify(requestedPerson) === JSON.stringify(userToEdit)) {
    if (fieldsToEdit.name) {
      userToEdit.name = fieldsToEdit.name;
    }
    if (fieldsToEdit.email) {
      userToEdit.email = fieldsToEdit.email;
    }
    if (fieldsToEdit.handle) {
      userToEdit.handle = fieldsToEdit.handle;
    }
    if (fieldsToEdit.avatar) {
      userToEdit.avatar = fieldsToEdit.avatar;
    }
    if (fieldsToEdit.password) {
      userToEdit.password = fieldsToEdit.password;
    }
    userToEdit.lastUpdatedDate = moment();
    userToEdit.save();
    return responseJson(200, userToEdit);
  } else {
    return responseJson(401, "You cannot edit this user");
  }
}else{
  return responseJson(400, "Cannot find user");
}
}

// Get single user by handle
export async function getSingleUser(handle: string) {
  return await UserSchema.findOne({ handle })
    .then((user) => {
      if (!user) {
        return responseJson(400, "User does not exists");
      } else {
        return responseJson(200, user);
      }
    })
    .catch((err) => {
      return responseJson(200, err);
    });
}

// Get all users
export async function getAllUsers() {
  return await UserSchema.find().then((users) => {
    return responseJson(200, users);
  });
}

// export async function deleteUser(handle:string, requestedUser: UserDoc) {
//   const reqUser = await UserSchema.findById(requestedUser._id);
//   if(reqUser){
//     const uTD = await UserSchema.findOne({ handle });
//     if (uTD) {
//       if (JSON.stringify(reqUser._id) === JSON.stringify(uTD._id)) {
//         await uTD.delete();
//         return responseJson(200, "User deleted");
//       } else {
//         return responseJson(400, "You cannot delete this user");
//       }
//     }else{
//       responseJson(400, "Cannot find user");
//     }
//   }else{
//     responseJson(400, "Cannot find user");
//   }
// }
