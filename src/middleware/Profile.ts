import { ProfileDoc } from "documents/Profile";
import { UserDoc } from "documents/User";
import UserSchema from "../models/User";
import ProfileSchema from "../models/Profile";

//Get single profile by handle
export async function getProfileByUserHandle(handle: string) {
  return await UserSchema.findOne({ handle: handle })
    .populate("profile")
    .then((user) => {
      if (!user) {
        return {
          status: 404,
          msg: "Cannot find user",
          timeStamp: Date.now(),
        };
      }
      if (!user.profile) {
        return {
          status: 404,
          msg: "No profile found for this user",
          timeStamp: Date.now(),
        };
      }
      return {
        status: 200,
        profile: user,
        timeStamp: Date.now(),
      };
    })
    .catch((err) => {
      return {
        status: 400,
        error: err,
        timeStamp: Date.now(),
      };
    });
}

//Create profile
export async function createProfile(
  handle: string,
  requestedUser: UserDoc,
  newProfile: ProfileDoc
) {
  let error: string;
  const profile = new ProfileSchema({
    user: requestedUser,
    firstName: newProfile.firstName,
    middleName: newProfile.middleName,
    lastName: newProfile.lastName,
    birthday: newProfile.birthday,
    address: newProfile.address,
    phone: newProfile.phone,
    createdDate: Date.now(),
    lastUpdatedDate: Date.now(),
  });
  return await UserSchema.findOne({ handle: handle }).then(async (user) => {
    if (!user) {
      return {
        status: 400,
        msg: "User does not exists",
        timeStamp: Date.now(),
      };
    }
    if (user._id.toString() !== requestedUser._id.toString()) {
      return {
        status: 400,
        msg: "You cannot create profile for someone else",
        timeStamp: Date.now(),
      };
    }
    if (user.profile) {
      return {
        status: 400,
        msg: "You already have a profile",
        timeStamp: Date.now(),
      };
    }
    user.profile = profile;
    await user.save().catch((err) => {
      error = err;
    });
    await profile.save().catch((err) => {
      error = err;
    });
    if (error) {
      return {
        status: 400,
        error: error,
        timeStamp: Date.now(),
      };
    } else {
      return {
        status: 201,
        profile: profile,
        timeStamp: Date.now(),
      };
    }
  });
}
