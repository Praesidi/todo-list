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

  // test later
  const changeProjectTitle = (project, newTitle) => {
    project.title = newTitle;
  };

  const deleteProject = (project) => {};

  const getProjectCollection = () => {
    return projectCollection;
  };

  const createNewTask = (title, project, description, priority, dueDate) => {
    const id = nanoid(10);
    let isImportant = false;
    let isDone = false;

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

  const editTask = () => {};

  const deleteTask = () => {};

  return {
    getProjectCollection,
    getTaskCollection,
    createNewProject,
    deleteProject,
    createNewTask,
    deleteTask,
  };
})();

export default dataController;
