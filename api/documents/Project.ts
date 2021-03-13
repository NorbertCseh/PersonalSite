import { Moment } from "moment";
import mongoose from "mongoose";
import { UserDoc } from "./User";

export interface ProjectDoc extends mongoose.Document {
  _id: string;
  user: UserDoc;
  name: string;
  deployedURL: string;
  sourceURL: string;
  imageURL: string;
  creationDate: Moment;
  lastUpdatedDate: Moment;
}
