import { PostDoc } from "documents/Post";
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

export async function getSinglePost(post_id: string) {
  return await PostSchema.findById(post_id)
    .then((post) => {
      if (!post) {
        return {
          status: 404,
          msg: "Post does not exists",
          timeStamp: Date.now(),
        };
      }
      return {
        status: 200,
        post: post,
        timeStamp: Date.now(),
      };
    })
    .catch((err) => {
      return {
        status: 404,
        error: err,
        timeStamp: Date.now(),
      };
    });
}

export async function getAllPosts() {
  return await PostSchema.find()
    .then((posts) => {
      return {
        status: 200,
        posts: posts,
        timeStamp: Date.now(),
      };
    })
    .catch((err) => {
      console.log(err);

      return {
        status: 200,
        error: err,
        timeStamp: Date.now(),
      };
    });
}

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
          timeStamp: Date.now(),
        };
      }
      if (post.author._id.toString() !== requestedUser._id.toString()) {
        error = "You cannot edit this post";
      } else {
        if (Object.keys(fieldsToEdit).length === 0) {
          return {
            status: 304,
            msg: "Empty fields",
            timeStamp: Date.now(),
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
              timeStamp: Date.now(),
            };
          })
          .catch((err) => {
            return {
              status: 400,
              error: err,
              timeStamp: Date.now(),
            };
          });
      }
    });
}

export async function deletePost(post_id: string, requestedUser: UserDoc) {
  return await PostSchema.findById(post_id)
    .populate("author")
    .then(async (post) => {
      if (!post) {
        return {
          status: 404,
          error: "Cannot find post",
          timeStamp: Date.now(),
        };
      }

      if (post.author._id.toString() !== requestedUser._id.toString()) {
        return {
          status: 400,
          error: "You cannot delete this post",
          timeStamp: Date.now(),
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
          timeStamp: Date.now(),
        };
      }
    });
}
