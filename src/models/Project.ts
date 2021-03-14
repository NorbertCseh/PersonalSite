import { Schema } from "mongoose";
import * as mongoose from "mongoose";
import { ProjectDoc } from "../documents/Project";

const ProjectSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  deployedURL: {
    type: String,
    required: false,
  },
  sourceURL: {
    type: String,
    required: false,
  },
  imageURL: {
    type: String,
    required: false,
  },
  creationDate: {
    type: Date,
    required: true,
  },
  lastUpdatedDate: {
    type: Date,
    required: true,
  },
});

export default mongoose.model<ProjectDoc>("Project", ProjectSchema);
