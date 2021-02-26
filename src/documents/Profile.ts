import * as mongoose from "mongoose";
import { UserDoc } from "./User";

export interface ProfileDoc extends mongoose.Document {
  _id: string;
  user: UserDoc;
  firstName: string;
  middleName: string;
  lastName: string;
  birthday: number;
  address: number;
  phone: number;
  createdDate: number;
  lastUpdatedDate: number;
}
