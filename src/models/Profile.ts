import { Schema } from "mongoose";
import * as mongoose from "mongoose";
import { ProfileDoc } from "../documents/Profile";

const ProfileSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  firstName: {
    type: String,
    required: false,
  },
  middleName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  birthday: {
    type: Date,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  phone: {
    type: Number,
    required: false,
  },
  experiences: [
    {
      type: Schema.Types.ObjectId,
      ref: "Experience",
      required: false,
    },
  ],
  schools: [
    {
      type: Schema.Types.ObjectId,
      ref: "School",
      required: false,
    },
  ],
  hobbies: [
    {
      type: String,
      required: false,
    },
  ],
  socials: [
    {
      type: String,
      required: false,
    },
  ],
  website: {
    type: String,
    required: false,
  },
  createdDate: {
    type: Date,
    required: true,
  },
  lastUpdatedDate: {
    type: Date,
    required: true,
  },
});

export default mongoose.model<ProfileDoc>("Profile", ProfileSchema);
