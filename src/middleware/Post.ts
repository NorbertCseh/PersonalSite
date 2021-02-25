import { UserDoc } from "documents/User";
import PostSchema from "../models/Post";
import UserSchema from "../models/User";

export async function createPost(
  author: UserDoc,
  postTitle: String,
  postBody: String
) {
  let error;

  const newPost = new PostSchema({
    author: author._id,
    postTitle: postTitle,
    postBody: postBody,
    createdDate: Date.now(),
    lastUpdatedDate: Date.now(),
  });
  await UserSchema.findById(author._id).then(async (user) => {
    await newPost.save().catch((err) => {
      error = err;
    });
    await user.save().catch((err) => {
      error = err;
    });
    await user.posts.push(newPost);
  });
  if (error) {
    return {
      status: 400,
      error: error,
      timeStamp: Date.now(),
    };
  } else {
    return {
      status: 201,
      post: newPost,
      timeStamp: Date.now(),
      user: author,
    };
  }
}
