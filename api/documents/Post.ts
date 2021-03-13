import { Moment } from "moment";
import mongoose from "mongoose";
import { UserDoc } from "./User";

export interface PostDoc extends mongoose.Document {
  _id: string;
  author: UserDoc;
  postTitle: string;
  postBody: string;
  comments: [
    {
      user: UserDoc;
      commentBody: string;
      createdDate: Moment;
      lastUpdatedDate: Moment;
    }
  ];
  createdDate: Moment;
  lastUpdatedDate: Moment;
}
