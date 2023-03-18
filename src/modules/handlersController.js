// this module controls modals, settings, event listeners
import dataController from './dataController.js';
import domController from './domController.js';

const handlersController = (() => {
  // add btns
  const addTaskBtn = document.getElementById('add-task-btn');
  const addProjectBtn = document.getElementById('add-project-btn');
  // close modal btn
  const closeTaskModalBtn = document.getElementById('close-task-modal-btn');
  const closeProjectModalBtn = document.getElementById(
    'close-project-modal-btn'
  );
  const closeInfoModalBtn = document.getElementById('close-info-modal-btn');
  // containers
  const projectContainer = document.getElementById('project-container');
  const taskContainer = document.getElementById('task-container');
  // modals&forms
  const taskModal = document.getElementById('task-modal');
  const projectModal = document.getElementById('project-modal');
  const infoModal = document.getElementById('info-modal');
  const taskForm = document.getElementById('task-form');
  const projectForm = document.getElementById('project-form');
  // task modal mode
  let taskModalMode = 'create';
  let projectModalMode = 'create';

  const closeProjectModal = () => {
    projectForm.reset();
    projectModal.close();
  };

  const projectModalTitle = document.getElementById('project-modal-title');

  const openProjectModal = () => {
    projectModalTitle.textContent = 'Create New Project';
    projectModalMode = 'create';

    if (taskModal.open || infoModal.open) {
      closeTaskModal();
      closeInfoModal();
    }
    hideProjectsMenu();
    projectModal.showModal();
  };

  const hideProjectsMenu = () => {
    const allProjectsMenu = Array.from(
      document.getElementsByClassName('popup-active')
    );

    allProjectsMenu.forEach((menu) => {
      menu.classList.remove('popup-active');
    });
  };

  const showProjectMenu = (e) => {
    const target = e.target;
    const numActiveMenus =
      document.getElementsByClassName('popup-active').length; // num of active menus
    // const numActiveMenus = document.querySelectorAll('.popup-active').length;

    if (target.id !== 'project-menu-btn') {
      return false;
    }

    if (target.nextElementSibling.classList.contains('popup-active')) {
      target.nextElementSibling.classList.remove('popup-active');
    } else {
      target.nextElementSibling.classList.add('popup-active');
    }

    if (numActiveMenus === 1) {
      hideProjectsMenu();
    }
  };

  const closeTaskModal = () => {
    taskForm.reset();
    taskModal.close();
  };

  const resetTaskModal = () => {
    taskForm.reset();
  };

  const taskModalTitle = document.getElementById('task-modal-title');

  const openTaskModal = () => {
    taskModalTitle.textContent = 'Create New Task';
    taskModalMode = 'create';
    if (projectModal.open || infoModal.open) {
      closeProjectModal();
      closeInfoModal();
    }
    hideProjectsMenu();
    taskModal.showModal();
  };

  // task info modal strings
  const infoModalTitle = document.getElementById('info-modal-title');
  const infoModalDescription = document.getElementById(
    'info-modal-description'
  );
  const infoModalPriority = document.getElementById('info-modal-priority');
  const infoModalDate = document.getElementById('info-modal-date');
  const infoModalProject = document.getElementById('info-modal-project');

  const closeInfoModal = () => {
    infoModal.close();
  };

  const openInfoModal = (obj) => {
    if (taskModal.open || projectModal.open) {
      closeProjectModal();
      closeTaskModal();
    }

    infoModalTitle.textContent = obj.title;
    infoModalPriority.textContent = obj.priority;
    infoModalProject.textContent = obj.project;

    obj.description === ''
      ? (infoModalDescription.textContent = 'Not Set')
      : (infoModalDescription.textContent = obj.description);

    obj.dueDate === ''
      ? (infoModalDate.textContent = 'Not Set')
      : (infoModalDate.textContent = obj.dueDate);

    hideProjectsMenu();
    infoModal.showModal();
  };

  let taskToEdit = {};
  let projectToEdit = {};

  // task form inputs
  const taskTitle = document.getElementById('task-title');
  const taskDescription = document.getElementById('task-description');
  const taskPriority = document.getElementById('task-priority');
  const taskDate = document.getElementById('task-date');

  const handleTaskForm = (e) => {
    e.preventDefault();
    const currentProject = dataController.getCurrentProject();
    const taskCollection = dataController.getTaskCollection();

    if (taskModalMode === 'create') {
      const task = dataController.createNewTask(
        taskTitle.value,
        currentProject,
        taskDescription.value,
        taskPriority.value,
        taskDate.value
      );
      resetTaskModal();
    }

    if (taskModalMode === 'edit') {
      dataController.editTask(
        taskToEdit,
        taskTitle.value,
        taskDescription.value,
        taskPriority.value,
        taskDate.value
      );
      closeTaskModal();
      console.log('task to edit', taskToEdit);
    }
    domController.populateTaskContainer(taskCollection);
    taskToEdit = {};
  };

  // project form inputs
  const projectTitle = document.getElementById('project-title');

  const handleProjectForm = (e) => {
    e.preventDefault();
    const projectCollection = dataController.getProjectCollection();
    // dataController.setCurrentProject();

    if (projectModalMode === 'create') {
      const project = dataController.createNewProject(projectTitle.value);
    }

    if (projectModalMode === 'edit') {
      dataController.editProject(projectToEdit, projectTitle.value);
    }

    domController.populateProjectContainer(projectCollection);
    projectToEdit = {};
    closeProjectModal();
  };

  const handleTaskCardBtns = (e) => {
    const target = e.target;
    const taskID = target.parentNode.parentNode.getAttribute('data-id');
    const taskCard = target.parentNode.parentNode;
    const taskObj = dataController.getTaskObject(taskID);
    const taskImportantBtn =
      document.getElementById('mark-important-btn').firstElementChild;

    if (target.id === 'task-checkbox' && target.checked) {
      dataController.markTaskDone(taskObj);
    } else {
      dataController.markTaskDone(taskObj, 1);
    }

    if (target.id === 'edit-task') {
      openTaskModal();
      taskModalTitle.textContent = 'Edit Task';
      taskModalMode = 'edit';

      // fills modal inputs with object properties
      taskTitle.value = taskObj.title;
      taskDescription.value = taskObj.description;
      taskPriority.value = taskObj.priority;
      taskDate.value = taskObj.dueDate;

      taskToEdit = taskObj;
    }

    if (target.id === 'show-task-info') {
      openInfoModal(taskObj);
    }

    if (target.id === 'mark-important-btn') {
      if (taskObj.isImportant) {
        dataController.markTaskImportant(taskObj);
        domController.markTaskImportant(taskImportantBtn);
      } else {
        dataController.markTaskImportant(taskObj, 1);
        domController.markTaskImportant(taskImportantBtn, 1);
      }
    }

    if (target.id === 'delete-task') {
      dataController.deleteTask(taskID);
      domController.deleteTask(taskCard);
    }
  };

  // TODO: close modal/project options when user click outside of the element

  const handleProjectCardBtns = (e) => {
    const target = e.target;
    const projectCard = target.parentNode.parentNode.parentNode;
    const projectID = projectCard.getAttribute('data-id');
    const projectObj = dataController.getProjectObject(projectID);

    if (target.id === 'project-edit-btn') {
      openProjectModal();
      projectModalTitle.textContent = 'Edit Project';
      projectModalMode = 'edit';

      // fills modal inputs with object properties
      projectTitle.value = projectObj.title;
      projectToEdit = projectObj;
    }

    if (target.id === 'project-delete-btn') {
      dataController.deleteProject(projectID);
      domController.deleteProject(projectCard);
    }
  };

  taskContainer.addEventListener('click', handleTaskCardBtns);

  projectContainer.addEventListener('click', handleProjectCardBtns);
  projectContainer.addEventListener('click', showProjectMenu);

  addTaskBtn.addEventListener('click', openTaskModal);
  addProjectBtn.addEventListener('click', openProjectModal);

  closeTaskModalBtn.addEventListener('click', closeTaskModal);
  closeProjectModalBtn.addEventListener('click', closeProjectModal);
  closeInfoModalBtn.addEventListener('click', closeInfoModal);

  taskForm.addEventListener('submit', handleTaskForm);
  projectForm.addEventListener('submit', handleProjectForm);
})();

export default handlersController;
