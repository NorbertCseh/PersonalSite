import * as moment from "moment";
import { PostDoc } from "../documents/Post";
import { UserDoc } from "../documents/User";
import PostSchema from "../models/Post";
import UserSchema from "../models/User";
import { responseJson } from "../helper/response";

//Create post
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
    createdDate: moment(),
    lastUpdatedDate: moment(),
  });
  await UserSchema.findById(author._id).then(async (user) => {
    //Push the post id to the User's posts array
    await user.posts.push(newPost);

    await user.save().catch((err) => {
      error = err;
    });

    await newPost.save().catch((err) => {
      error = err;
    });
  });
  if (error) {
    return {
      status: 400,
      error: error,
      timeStamp: moment(),
    };
  } else {
    return {
      status: 201,
      post: newPost,
      timeStamp: moment(),
      user: author,
    };
  }
}

//Get single post with comments
export async function getSinglePost(post_id: string) {
  return await PostSchema.findById(post_id)
    .then((post) => {
      if (!post) {
        return {
          status: 404,
          msg: "Post does not exists",
          timeStamp: moment(),
        };
      }
      return {
        status: 200,
        post: post,
        timeStamp: moment(),
      };
    })
    .catch((err) => {
      return {
        status: 404,
        error: err,
        timeStamp: moment(),
      };
    });
}

//Get all posts without the comments
export async function getAllPosts() {
  return await PostSchema.find()
    .populate("comment")
    .then((posts) => {
      return {
        status: 200,
        posts: posts,
        timeStamp: moment(),
      };
    })
    .catch((err) => {
      console.log(err);

      return {
        status: 200,
        error: err,
        timeStamp: moment(),
      };
    });
}

//Update post
export async function updatePost(
  post_id: string,
  fieldsToEdit: PostDoc,
  requestedUser: UserDoc
) {
  let error: string;
  return await PostSchema.findById(post_id)
    .populate("author")
    .then(async (post) => {
      if (!post) {
        return {
          status: 403,
          msg: "No post found",
          timeStamp: moment(),
        };
      }
      if (post.author._id.toString() !== requestedUser._id.toString()) {
        error = "You cannot edit this post";
      } else {
        if (Object.keys(fieldsToEdit).length === 0) {
          return {
            status: 304,
            msg: "Empty fields",
            timeStamp: moment(),
          };
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
            return {
              status: 204,
              msg: "Post updated",
              post: editedPost,
              timeStamp: moment(),
            };
          })
          .catch((err) => {
            return {
              status: 400,
              error: err,
              timeStamp: moment(),
            };
          });
      }
    });
}

//Delete post
export async function deletePost(post_id: string, requestedUser: UserDoc) {
  return await PostSchema.findById(post_id)
    .populate("author")
    .then(async (post) => {
      if (!post) {
        return {
          status: 404,
          error: "Cannot find post",
          timeStamp: moment(),
        };
      }

      if (post.author._id.toString() !== requestedUser._id.toString()) {
        return {
          status: 400,
          error: "You cannot delete this post",
          timeStamp: moment(),
        };
      } else {
        //Delete the id from User's Posts array
        await UserSchema.findById(post.author._id).updateOne({
          $pull: { posts: { $in: post._id } },
        });
        await post.delete();
        return {
          status: 200,
          msg: "Post deleted",
          timeStamp: moment(),
        };
      }
    });
}

//Add comment to post
export async function createComment(
  post_id: String,
  requestedUser: UserDoc,
  commentBody: string
) {
  if (!commentBody) {
    return await responseJson(400, "Comment is empty");
  }
  const post: PostDoc = await PostSchema.findById(post_id);
  if (!post) {
    return await responseJson(404, "Cannot find user");
  }
  const newComment = {
    user: requestedUser,
    commentBody: commentBody,
    createdDate: moment(),
    lastUpdatedDate: moment(),
  };
  await post.comments.push(newComment);
  await post.save();
  return await responseJson(201, await post.populate("comments"));
}
