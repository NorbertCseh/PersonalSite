import * as moment from "moment";
import { ProjectDoc } from "../documents/Project";
import { UserDoc } from "../documents/User";
import UserSchema from "../models/User";
import ProjectSchema from "../models/Project";

//Create project
export async function createProject(
  requestedUser: UserDoc,
  project: ProjectDoc
) {
  let error: Array<string>;
  if (!project.name) {
    return {
      status: 400,
      msg: "Name cannot be empty",
      timeStamp: moment(),
    };
  } else {
    const newProject = new ProjectSchema({
      user: requestedUser,
      name: project.name,
      deployedURL: project.deployedURL,
      gitURL: project.gitURL,
      imageURL: project.imageURL,
      creationDate: moment(),
      lastUpdatedDate: moment(),
    });
    const user = await UserSchema.findById(requestedUser.id);
    await user.projects.push(newProject);
    await user.save().catch((err) => {
      error.push(err);
    });
    await newProject.save().catch((err) => {
      error.push(err);
    });
    if (error) {
      return {
        status: 400,
        msg: error,
        timeStamp: moment(),
      };
    }
    return {
      status: 201,
      project: newProject,
      timeStamp: moment(),
    };
  }
}

//Get single project
export async function getProject(project_id: string) {
  return await ProjectSchema.findById(project_id)
    .populate("user")
    .then((project) => {
      if (!project) {
        return {
          status: 404,
          msg: "Project not found",
          timeStamp: moment(),
        };
      } else {
        return {
          status: 200,
          project: project,
          timeStamp: moment(),
        };
      }
    });
}

//Get All project
export async function getProjects() {
  return await ProjectSchema.find().then((projects) => {
    if (!projects) {
      return {
        status: 404,
        msg: "No projects found",
        timeStamp: moment(),
      };
    } else {
      return {
        status: 200,
        project: projects,
        timeStamp: moment(),
      };
    }
  });
}

//Get All project from a user
export async function getProjectsFromOneUser(handle: string) {
  return await UserSchema.findOne({ handle: handle })
    .populate("projects")
    .then((user) => {
      if (!user) {
        return {
          status: 404,
          msg: "No user found",
          timeStamp: moment(),
        };
      } else {
        return {
          status: 200,
          projects: user,
          timeStamp: moment(),
        };
      }
    });
}

//Edit project
export async function updateProject(
  project_id: string,
  requestedUser: UserDoc,
  fieldToUpdate: ProjectDoc
) {
  let error: Array<string>;
  if (Object.keys(fieldToUpdate).length === 0) {
    return {
      status: 400,
      msg: "No fields to edit",
      timeStamp: moment(),
    };
  }
  const reqUser = await UserSchema.findById(requestedUser.id);

  const project = await ProjectSchema.findById(project_id);
  if (!project) {
    return {
      status: 404,
      msg: "Cannot find project",
      timeStamp: moment(),
    };
  }
  if (reqUser._id.toString() !== project.user.toString()) {
    return {
      status: 404,
      msg: "You cannot edit this project",
      timeStamp: moment(),
    };
  }
  if (fieldToUpdate.name) {
    project.name = fieldToUpdate.name;
  }
  if (fieldToUpdate.deployedURL) {
    project.deployedURL = fieldToUpdate.deployedURL;
  }
  if (fieldToUpdate.gitURL) {
    project.gitURL = fieldToUpdate.gitURL;
  }
  if (fieldToUpdate.imageURL) {
    project.imageURL = fieldToUpdate.imageURL;
  }
  project.lastUpdatedDate = moment();
  await project.save().catch((err) => {
    error.push(err);
  });
  if (error) {
    return {
      status: 400,
      error: error,
      timeStamp: moment(),
    };
  }
  return {
    status: 200,
    project: project,
    timeStamp: moment(),
  };
}

export async function deleteProject(
  project_id: string,
  requestedUser: UserDoc
) {
  const project = await ProjectSchema.findById(project_id);
  if (!project) {
    return {
      status: 404,
      msg: "Cannot find project",
      timeStamp: moment(),
    };
  }
  const reqUser = await UserSchema.findById(requestedUser.id);
  if (reqUser._id.toString() !== project.user.toString()) {
    return {
      status: 404,
      msg: "You cannot delete this project",
      timeStamp: moment(),
    };
  }
  await UserSchema.findById(project.user._id).updateOne({
    $pull: { projects: { $in: project._id } },
  });
  await project.delete();
  return {
    status: 200,
    msg: "Deleted",
    timeStamp: moment(),
  };
}
