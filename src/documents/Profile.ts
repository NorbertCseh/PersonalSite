import { Moment } from "moment";
import * as mongoose from "mongoose";
import { UserDoc } from "./User";

export interface ProfileDoc extends mongoose.Document {
  _id: string;
  user: UserDoc;
  firstName: string;
  middleName: string;
  lastName: string;
  birthday: Moment;
  address: number;
  phone: number;
  experiences: string[];
  schools: string[];
  hobbies: string[];
  socials: string[];
  website: string;
  createdDate: Moment;
  lastUpdatedDate: Moment;
}
