import { Schema } from "mongoose";
import * as mongoose from "mongoose";
import { UserDoc } from "../documents/User";

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  handle: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: "Profile",
    required: false,
  },
  projects: [
    {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: false,
    },
  ],
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: false,
    },
  ],
  registerDate: {
    type: Date,
    required: true,
  },
  lastUpdatedDate: {
    type: Date,
    required: true,
  },
});

// TODO: I should create these here

// UserSchema.statics.findWithCompany = function(id) {
//   return this.findById(id).populate("company").exec()
// }

export default mongoose.model<UserDoc>("User", UserSchema);
