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
  // modals&forms
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
    taskForm.reset();
    taskModal.close();
  };

  const closeProjectModal = () => {
    projectForm.reset();
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
    const currentProject = 1;

    const task = dataController.createNewTask(
      taskTitle.value,
      currentProject,
      taskDescription.value,
      taskPriority.value,
      taskDate.value
    );

    const taskCollection = dataController.getTaskCollection();

    domController.populateTaskContainer(taskCollection);
    resetTaskModal();
  };

  const handleProjectForm = (e) => {
    e.preventDefault();

    const project = dataController.createNewProject(projectTitle.value);
    const projectCollection = dataController.getProjectCollection();

    domController.populateProjectContainer(projectCollection);
    closeProjectModal();
  };

  const showProjectMenu = () => {
    console.log(projectPopupMenu.classList.contains('popup-active'));
    if (projectPopupMenu.classList.contains('popup-active')) {
      projectPopupMenu.classList.remove('popup-active');
    } else {
      projectPopupMenu.classList.add('popup-active');
    }
  };

  // add event listeners to created projects with bubbling
  const projectContainer = document.getElementById('project-container');

  const showPopupMenu = (e) => {
    console.log(e.target);
    const projectPopupMenu = document.getElementById('project-menu');
    const projectPopupMenuBtn = document.getElementById('project-menu-btn');
    // if (
    //   e.target.id === 'project-menu-btn' &&
    //   e.target.nextSibling.classList.contains('popup-active')
    // ) {
    //   e.target.nextSibling.classList.remove('popup-active');
    // } else {
    //   e.target.nextSibling.classList.add('popup-active');
    // }
    if (projectPopupMenu.classList.contains('popup-active')) {
      projectPopupMenu.classList.remove('popup-active');
    } else {
      projectPopupMenu.classList.add('popup-active');
    }
  };

  projectContainer.addEventListener('click', showPopupMenu);

  addTaskBtn.addEventListener('click', openTaskModal);
  addProjectBtn.addEventListener('click', openProjectModal);

  closeTaskModalBtn.addEventListener('click', closeTaskModal);
  closeProjectModalBtn.addEventListener('click', closeProjectModal);

  taskForm.addEventListener('submit', handleTaskForm);
  projectForm.addEventListener('submit', handleProjectForm);

  projectPopupMenuBtn.addEventListener('click', showProjectMenu);
})();

export default handlersController;
