import { Moment } from "moment";
import * as mongoose from "mongoose";
import { UserDoc } from "./User";

export interface ProjectDoc extends mongoose.Document {
  _id: string;
  user: UserDoc;
  name: string;
  deployedURL: string;
  gitURL: string;
  imageURL: string;
  creationDate: Moment;
  lastUpdatedDate: Moment;
}
