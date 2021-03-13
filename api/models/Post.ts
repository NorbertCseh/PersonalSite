import { Schema } from "mongoose";
import mongoose from "mongoose";
import { PostDoc } from "../documents/Post";

const PostSchema: Schema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  postTitle: {
    type: String,
    required: true,
  },
  postBody: {
    type: String,
    required: true,
  },
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      commentBody: {
        type: String,
        required: true,
      },
      createdDate: {
        type: Date,
        required: true,
      },
      lastUpdatedDate: {
        type: Date,
        required: true,
      },
    },
  ],
  createdDate: {
    type: Date,
    required: true,
  },
  lastUpdatedDate: {
    type: Date,
    required: true,
  },
});

export default mongoose.model<PostDoc>("Post", PostSchema);
