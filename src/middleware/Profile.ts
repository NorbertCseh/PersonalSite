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
    experiences: newProfile.experiences,
    schools: newProfile.schools,
    hobbies: newProfile.hobbies,
    socials: newProfile.socials,
    website: newProfile.website,
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

//Edit profile
export async function updateProfile(
  handle: string,
  requestedUser: UserDoc,
  fieldsToEdit: ProfileDoc
) {
  return await UserSchema.findOne({ handle: handle })
    .populate("profile")
    .then(async (user) => {
      if (requestedUser._id.toString() !== user._id.toString()) {
        return {
          status: 400,
          msg: "You cannot edit this profile",
          timeStamp: Date.now(),
        };
      }
      if (!user.profile) {
        return {
          status: 400,
          msg: "No profile found for this user",
          timeStamp: Date.now(),
        };
      }
      if (Object.keys(fieldsToEdit).length === 0) {
        return {
          status: 400,
          msg: "No fields to edit",
          timeStamp: Date.now(),
        };
      }
      if (fieldsToEdit.firstName) {
        user.profile.firstName = fieldsToEdit.firstName;
      }
      if (fieldsToEdit.middleName) {
        user.profile.middleName = fieldsToEdit.middleName;
      }
      if (fieldsToEdit.lastName) {
        user.profile.lastName = fieldsToEdit.lastName;
      }
      if (fieldsToEdit.birthday) {
        user.profile.birthday = fieldsToEdit.birthday;
      }
      if (fieldsToEdit.address) {
        user.profile.address = fieldsToEdit.address;
      }
      if (fieldsToEdit.phone) {
        user.profile.phone = fieldsToEdit.phone;
      }
      if (fieldsToEdit.experiences) {
        user.profile.experiences = fieldsToEdit.experiences;
      }
      if (fieldsToEdit.schools) {
        user.profile.schools = fieldsToEdit.schools;
      }
      if (fieldsToEdit.hobbies) {
        user.profile.hobbies = fieldsToEdit.hobbies;
      }
      if (fieldsToEdit.socials) {
        user.profile.socials = fieldsToEdit.socials;
      }
      if (fieldsToEdit.website) {
        user.profile.website = fieldsToEdit.website;
      }
      user.profile.lastUpdatedDate = Date.now();
      return await user.profile
        .save()
        .then((profile) => {
          return {
            status: 200,
            profile: profile,
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
    });
}

//Delete Profile
export async function deleteProfile(handle: string, requestedUser: UserDoc) {
  return await UserSchema.findOne({ handle: handle })
    .populate("profile")
    .then(async (user) => {
      if (requestedUser._id.toString() !== user._id.toString()) {
        return {
          status: 400,
          msg: "You cannot delete this profile",
          timeStamp: Date.now(),
        };
      }
      if (!user.profile) {
        return {
          status: 400,
          msg: "Profile does not exists",
          timeStamp: Date.now(),
        };
      }
      return await user.profile
        .delete()
        .then(async () => {
          user.profile = null;
          return await user
            .save()
            .then((user) => {
              return {
                status: 200,
                msg: "Profile deleted",
                user: user,
                timeStamp: Date.now(),
              };
            })
            .catch((err) => {
              return {
                status: 400,
                msg: err,
                timeStamp: Date.now(),
              };
            });
        })
        .catch((err) => {
          return {
            status: 400,
            msg: err,
            timeStamp: Date.now(),
          };
        });
    });
}
