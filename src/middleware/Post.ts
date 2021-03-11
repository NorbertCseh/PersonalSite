import * as moment from "moment";
import { PostDoc } from "../documents/Post";
import { UserDoc } from "../documents/User";
import PostSchema from "../models/Post";
import UserSchema from "../models/User";
import { responseJson } from "../helper/response";

// Create post
export async function createPost(
  author: UserDoc,
  postTitle: string,
  postBody: string
) {
  let error;

  const newPost = new PostSchema({
    author: author._id,
    postTitle,
    postBody,
    createdDate: moment(),
    lastUpdatedDate: moment(),
  });
  await UserSchema.findById(author._id).then(async (user) => {
    // Push the post id to the User's posts array
    await user.posts.push(newPost);

    await user.save().catch((err) => {
      error = err;
    });

    await newPost.save().catch((err) => {
      error = err;
    });
  });
  if (error) {
    return responseJson(400, error);
  } else {
    return responseJson(201, newPost);
  }
}

// Get single post with comments
export async function getSinglePost(postId: string) {
  return await PostSchema.findById(postId)
    .then(async (post) => {
      if (!post) {
        return responseJson(404, "Cannot find post");
      }
      return responseJson(200, post);
    })
    .catch((err) => {
      return responseJson(400, err);
    });
}

// Get all posts without the comments
export async function getAllPosts() {
  return await PostSchema.find()
    .populate("comment")
    .then((posts) => {
      return responseJson(200, posts);
    })
    .catch((err) => {
      return responseJson(400, err);
    });
}

// Update post
export async function updatePost(
  postId: string,
  fieldsToEdit: PostDoc,
  requestedUser: UserDoc
) {
  return await PostSchema.findById(postId)
    .populate("author")
    .then(async (post) => {
      if (!post) {
        return responseJson(404, "Post not found");
      }
      if (post.author._id.toString() !== requestedUser._id.toString()) {
        return responseJson(400, "You cannot edit this user");
      } else {
        if (Object.keys(fieldsToEdit).length === 0) {
          return responseJson(400, "No field to edit");
        }
        if (fieldsToEdit.postTitle) {
          post.postTitle = fieldsToEdit.postTitle;
        }
        if (fieldsToEdit.postBody) {
          post.postBody = fieldsToEdit.postBody;
        }
        return await post
          .save()
          .then((editedPost) => {
            return responseJson(200, editedPost);
          })
          .catch((err) => {
            return responseJson(400, err);
          });
      }
    });
}

// Delete post
export async function deletePost(postId: string, requestedUser: UserDoc) {
  return await PostSchema.findById(postId)
    .populate("author")
    .then(async (post) => {
      if (!post) {
        return responseJson(404, "Cannot find post");
      }

      if (post.author._id.toString() !== requestedUser._id.toString()) {
        return responseJson(400, "You cannot edit this user");
      } else {
        // Delete the id from User's Posts array
        await UserSchema.findById(post.author._id).updateOne({
          $pull: { posts: { $in: post._id } },
        });
        await post.delete();
        return responseJson(200, "Post deleted");
      }
    });
}

// Add comment to post
export async function createComment(
  postId: string,
  requestedUser: UserDoc,
  commentBody: string
) {
  if (!commentBody) {
    return await responseJson(400, "Comment is empty");
  }
  const post: PostDoc = await PostSchema.findById(postId);
  if (!post) {
    return await responseJson(404, "Cannot find user");
  }
  const newComment = {
    user: requestedUser,
    commentBody,
    createdDate: moment(),
    lastUpdatedDate: moment(),
  };
  await post.comments.push(newComment);
  await post.save();
  return await responseJson(201, await post.populate("comments"));
}
