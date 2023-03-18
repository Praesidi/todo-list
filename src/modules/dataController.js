import { nanoid } from 'nanoid';

// this module controls creating, editing, deleting of tasks and projects

const dataController = (() => {
  let projectCollection = [];
  let taskCollection = [];

  const createNewProject = (title) => {
    const id = nanoid(5);
    const project = {
      title,
      id,
    };

    projectCollection.push(project);

    return project;
  };

  const editProject = (projectObj, ...rest) => {
    const [title] = rest;
    projectObj.title = title;
  };

  const deleteProject = (projectID) => {
    const projectIndex = projectCollection.findIndex(
      (project) => project.id === Number(projectID)
    );
    projectCollection.splice(projectIndex, 1);
  };

  const getProjectCollection = () => {
    return projectCollection;
  };

  const getProjectObject = (projectID) => {
    let projectObj = {};
    projectCollection.forEach((project) => {
      if (project.id === projectID) {
        projectObj = project;
      }
    });
    return projectObj;
  };

  let currentProject = 1;
  // TODO: write a function to set default value for current project onload

  const setCurrentProject = (projectID) => {
    currentProject = projectID;
  };

  const getCurrentProject = () => {
    return currentProject;
  };

  const createNewTask = (title, project, description, priority, dueDate) => {
    const id = nanoid(10);
    let isImportant = false;
    let isDone = false;
    project = currentProject; //projects id

    const task = {
      title,
      id,
      project,
      description,
      priority,
      dueDate,
      isImportant,
      isDone,
    };
    taskCollection.push(task);

    return task;
  };

  const getTaskCollection = () => {
    return taskCollection;
  };

  const getTaskObject = (taskID) => {
    let taskObj = {};
    taskCollection.forEach((task) => {
      if (task.id === taskID) {
        taskObj = task;
      }
    });
    return taskObj;
  };

  const editTask = (taskObj, ...rest) => {
    const [title, description, priority, dueDate] = rest;

    taskObj.title = title;
    taskObj.description = description;
    taskObj.priority = priority;
    taskObj.dueDate = dueDate;
  };

  const markTaskImportant = (taskObj, ...rest) => {
    const [status] = rest;
    if (status) {
      taskObj.isImportant = true;
    } else {
      taskObj.isImportant = false;
    }
  };

  const markTaskDone = (taskObj, ...rest) => {
    const [status] = rest;
    if (status) {
      taskObj.isDone = false;
    } else {
      taskObj.isDone = true;
    }
  };

  const deleteTask = (taskID) => {
    const taskIndex = taskCollection.findIndex((task) => task.id === taskID);
    taskCollection.splice(taskIndex, 1);
  };

  return {
    getProjectCollection,
    getTaskCollection,
    getCurrentProject,
    setCurrentProject,
    markTaskImportant,
    createNewProject,
    getProjectObject,
    deleteProject,
    getTaskObject,
    createNewTask,
    markTaskDone,
    editProject,
    deleteTask,
    editTask,
  };
})();

export default dataController;
