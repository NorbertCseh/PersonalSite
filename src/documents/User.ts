import { Moment } from "moment";
import * as mongoose from "mongoose";
import { PostDoc } from "./Post";
import { ProfileDoc } from "./Profile";
import { ProjectDoc } from "./Project";

export interface UserDoc extends mongoose.Document {
  _id: string;
  name: string;
  email: string;
  handle: string;
  avatar: string;
  password: string;
  isAdmin: boolean;
  profile: ProfileDoc;
  projects: ProjectDoc[];
  posts: PostDoc[];
  registerDate: Moment;
  lastUpdatedDate: Moment;
}
