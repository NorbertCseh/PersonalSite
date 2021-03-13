import { Moment } from "moment";
import mongoose from "mongoose";
import { UserDoc } from "./User";

export interface ProfileDoc extends mongoose.Document {
  _id: string;
  user: UserDoc;
  firstName: string;
  middleName: string;
  lastName: string;
  birthday: Moment;
  address: string;
  phone: number;
  experiences: [
    {
      experienceName: string;
      experienceFrom: Moment;
      experienceTo: Moment;
      experienceDescription: string;
      createdDate: Moment;
      lastUpdatedDate: Moment;
    }
  ];
  schools: [
    {
      schoolName: string;
      degree: string;
      schoolFrom: Moment;
      schoolTo: Moment;
      schoolDescription: string;
      createdDate: Moment;
      lastUpdatedDate: Moment;
    }
  ];
  hobbies: string[];
  socials: {
    github: string;
    youtube: string;
    twitter: string;
    facebook: string;
    linkedin: string;
    instagram: string;
  };
  website: string;
  createdDate: Moment;
  lastUpdatedDate: Moment;
}
