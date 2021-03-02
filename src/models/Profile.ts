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
      experienceName: {
        type: String,
        required: true,
      },
      experienceFrom: {
        type: String,
        required: true,
      },
      experienceTo: {
        type: String,
        required: false,
      },
      experienceDescription: {
        type: String,
        required: false,
      },
      createdDate: {
        type: String,
        required: true,
      },
      lastUpdatedDate: {
        type: String,
        required: true,
      },
    },
  ],
  schools: [
    {
      schoolName: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        required: true,
      },
      schoolFrom: {
        type: String,
        required: true,
      },
      schoolTo: {
        type: String,
        required: false,
      },
      schoolDescription: {
        type: String,
        required: false,
      },
      createdDate: {
        type: String,
        required: true,
      },
      lastUpdatedDate: {
        type: String,
        required: true,
      },
    },
  ],
  hobbies: [
    {
      type: String,
      required: false,
    },
  ],
  social: {
    youtube: {
      type: String,
      required: false,
    },
    twitter: {
      type: String,
      required: false,
    },
    facebook: {
      type: String,
      required: false,
    },
    linkedin: {
      type: String,
      required: false,
    },
    instagram: {
      type: String,
      required: false,
    },
  },
  personalWebsite: {
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
