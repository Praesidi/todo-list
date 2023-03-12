// this module controls modals, settings, event listeners
import dataController from './dataController.js';
import domController from './domController.js';

const handlersController = (() => {
  // default values
  const DEFAULT_FOLDER = 'inbox';

  const addTaskBtn = document.getElementById('add-task-btn');
  const addProjectBtn = document.getElementById('add-project-btn');
  const closeTaskModalBtn = document.getElementById('close-task-modal-btn');
  const closeProjectModalBtn = document.getElementById(
    'close-project-modal-btn'
  );
  const taskModal = document.getElementById('task-modal');
  const projectModal = document.getElementById('project-modal');
  const taskForm = document.getElementById('task-form');
  const projectForm = document.getElementById('project-form');
  // project form inputs
  const projectTitle = document.getElementById('project-title');
  // task form inputs
  const taskTitle = document.getElementById('task-title');
  const taskDescription = document.getElementById('task-description');
  const taskPriority = document.getElementById('task-priority');
  const taskDate = document.getElementById('task-date');

  const closeTaskModal = () => {
    taskModal.close();
  };

  const closeProjectModal = () => {
    projectModal.close();
  };

  const resetTaskModal = () => {
    taskForm.reset();
  };

  const openTaskModal = () => {
    if (projectModal.open) {
      closeProjectModal();
    }
    taskModal.show();
  };

  const openProjectModal = () => {
    if (taskModal.open) {
      closeTaskModal();
    }
    projectModal.show();
  };

  const handleTaskForm = (e) => {
    e.preventDefault();
    console.log('foo');
    const currentProject = 1;

    const task = dataController.createNewTask(
      taskTitle.value,
      currentProject,
      taskDescription.value,
      taskPriority.value,
      taskDate.value
    );

    domController.createTask(task);
    resetTaskModal();
    console.log(dataController.getTaskCollection());
  };

  const handleProjectForm = () => {
    const project = dataController.createNewProject(projectTitle);
  };

  addTaskBtn.addEventListener('click', openTaskModal);
  addProjectBtn.addEventListener('click', openProjectModal);

  closeTaskModalBtn.addEventListener('click', closeTaskModal);
  closeProjectModalBtn.addEventListener('click', closeProjectModal);

  taskForm.addEventListener('submit', handleTaskForm);
  projectForm.addEventListener('submit', handleProjectForm);
})();

export default handlersController;
