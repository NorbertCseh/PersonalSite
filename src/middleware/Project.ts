import * as moment from "moment";
import { ProjectDoc } from "../documents/Project";
import { UserDoc } from "../documents/User";
import UserSchema from "../models/User";
import ProjectSchema from "../models/Project";
import { responseJson } from "../helper/response";

//Create project
export async function createProject(
  requestedUser: UserDoc,
  project: ProjectDoc
) {
  let error: Array<string>;
  if (!project.name) {
    return responseJson(400, "Name cannot be empty");
  } else {
    const newProject = new ProjectSchema({
      user: requestedUser,
      name: project.name,
      deployedURL: project.deployedURL,
      sourceURL: project.sourceURL,
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
      return responseJson(400, error);
    }
    return responseJson(201, newProject);
  }
}

//Get single project
export async function getProject(project_id: string) {
  return await ProjectSchema.findById(project_id)
    .populate("user")
    .then(async (project) => {
      if (!project) {
        return await responseJson(404, "Cannot find project");
      } else {
        return responseJson(200, project);
      }
    });
}

//Get All project
export async function getProjects() {
  return await ProjectSchema.find().then(async (projects) => {
    if (!projects) {
      return await responseJson(400, "No project found");
    } else {
      return responseJson(200, projects);
    }
  });
}

//Get All project from a user
export async function getProjectsFromOneUser(handle: string) {
  return await UserSchema.findOne({ handle: handle })
    .populate("projects")
    .then(async (user) => {
      if (!user) {
        return await responseJson(404, "User not found");
      } else {
        return responseJson(200, user);
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
    return responseJson(400, "No field to edit");
  }
  const reqUser = await UserSchema.findById(requestedUser.id);

  const project = await ProjectSchema.findById(project_id);
  if (!project) {
    return responseJson(400, "Cannot find project");
  }
  if (reqUser._id.toString() !== project.user.toString()) {
    return responseJson(404, "You cannot edit this project");
  }
  if (fieldToUpdate.name) {
    project.name = fieldToUpdate.name;
  }
  if (fieldToUpdate.deployedURL) {
    project.deployedURL = fieldToUpdate.deployedURL;
  }
  if (fieldToUpdate.sourceURL) {
    project.sourceURL = fieldToUpdate.sourceURL;
  }
  if (fieldToUpdate.imageURL) {
    project.imageURL = fieldToUpdate.imageURL;
  }
  project.lastUpdatedDate = moment();
  await project.save().catch((err) => {
    error.push(err);
  });
  if (error) {
    return responseJson(400, error);
  }
  return responseJson(200, project);
}

export async function deleteProject(
  project_id: string,
  requestedUser: UserDoc
) {
  const project = await ProjectSchema.findById(project_id);
  if (!project) {
    return responseJson(404, "Cannot find project");
  }
  const reqUser = await UserSchema.findById(requestedUser.id);
  if (reqUser._id.toString() !== project.user.toString()) {
    return responseJson(400, "You cannot delete this project");
  }
  await UserSchema.findById(project.user._id).updateOne({
    $pull: { projects: { $in: project._id } },
  });
  await project.delete();
  return responseJson(200, "Project deleted");
}
