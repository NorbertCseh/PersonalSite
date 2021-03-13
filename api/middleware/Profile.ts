import { ProfileDoc } from "../documents/Profile";
import { UserDoc } from "../documents/User";
import UserSchema from "../models/User";
import ProfileSchema from "../models/Profile";
import moment from "moment"
import { responseJson } from "../helper/response";

// Get single profile by handle
export async function getProfileByUserHandle(handle: string) {
  return await UserSchema.findOne({ handle })
    .populate("profile")
    .then(async (user) => {
      if (!user) {
        return await responseJson(404, "Cannot find user");
      }
      if (!user.profile) {
        return responseJson(404, "Profile not found");
      }
      return responseJson(200, user);
    })
    .catch((err) => {
      return responseJson(400, err);
    });
}

// Create profile
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
    createdDate: moment(),
    lastUpdatedDate: moment(),
  });
  // TODO: Rework pls
  return await UserSchema.findOne({ handle }).then(async (user) => {
    if (!user) {
      return responseJson(404, "User not found");
    }
    if (user._id.toString() !== requestedUser._id.toString()) {
      return responseJson(400, "Name cannot be empty");
    }
    if (user.profile) {
      return responseJson(400, "Cannot add profile");
    }
    user.profile = profile;
    await user.save().catch((err) => {
      error = err;
    });
    await profile.save().catch((err) => {
      error = err;
    });
    if (error) {
      return responseJson(400, error);
    } else {
      return responseJson(201, profile);
    }
  });
}

// Edit profile REWORKLDPLS
export async function updateProfile(
  handle: string,
  requestedUser: UserDoc,
  fieldsToEdit: ProfileDoc
) {
  return await UserSchema.findOne({ handle })
    .populate("profile")
    .then(async (user) => {
      if(!user){
        return responseJson(400, "Cannot find project");
      }
      if (requestedUser._id.toString() !== user._id.toString()) {
        return responseJson(400, "Cannot edit this profile");
      }
      if (!user.profile) {
        return responseJson(404, "Profile not found");
      }
      if (Object.keys(fieldsToEdit).length === 0) {
        return responseJson(400, "No field to edit");
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
      user.profile.lastUpdatedDate = moment();
      return await user.profile
        .save()
        .then((profile) => {
          return responseJson(200, profile);
        })
        .catch((err) => {
          return responseJson(400, err);
        });
    });
}

// Delete Profile REWORK
export async function deleteProfile(handle: string, requestedUser: UserDoc) {
  return await UserSchema.findOne({ handle })
    .populate("profile")
    .then(async (user) => {
      if(!user){
        return responseJson(400, "Cannot find project");
      }
      if (requestedUser._id.toString() !== user._id.toString()) {
        return responseJson(400, "Cannot delete profile");
      }
      if (!user.profile) {
        return responseJson(404, "Profile does not exists");
      }
      return await user.profile
        .delete()
        .then(async () => {
          await user.profile.delete();
          return await user
            .save()
            .then(() => {
              return responseJson(200, "User deleted");
            })
            .catch((err) => {
              return responseJson(400, err);
            });
        })
        .catch((err) => {
          return responseJson(400, err);
        });
    });
}
