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

  const closeTaskModal = () => {
    taskForm.reset();
    taskModal.close();
  };

  const closeProjectModal = () => {
    projectForm.reset();
    projectModal.close();
  };

  const closeInfoModal = () => {
    infoModal.close();
  };

  const resetTaskModal = () => {
    taskForm.reset();
  };

  const taskModalTitle = document.getElementById('task-modal-title');

  const openTaskModal = () => {
    // resetTaskModal();
    taskModalTitle.textContent = 'Create New Task';
    taskModalMode = 'create';
    if (projectModal.open || infoModal.open) {
      closeProjectModal();
      closeInfoModal();
    }
    taskModal.show();
  };

  const openProjectModal = () => {
    if (taskModal.open || infoModal.open) {
      closeTaskModal();
      closeInfoModal();
    }
    projectModal.show();
  };

  const openInfoModal = () => {
    if (taskModal.open || projectModal.open) {
      closeProjectModal();
      closeTaskModal();
    }
    infoModal.open();
  };

  // task form inputs
  const taskTitle = document.getElementById('task-title');
  const taskDescription = document.getElementById('task-description');
  const taskPriority = document.getElementById('task-priority');
  const taskDate = document.getElementById('task-date');

  const handleTaskForm = (e) => {
    e.preventDefault();
    const currentProject = dataController.getCurrentProject();

    if (taskModalMode === 'create') {
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
    }

    if (taskModalMode === 'edit') {
      dataController.editTask(
        taskObj, // FIXME:
        taskTitle.value,
        taskDescription.value,
        taskPriority.value,
        taskDate.value
      );
      domController.populateTaskContainer(dataController.getTaskCollection());
      closeTaskModal();
    }

    console.log(dataController.getTaskCollection());
  };

  // project form inputs
  const projectTitle = document.getElementById('project-title');

  const handleProjectForm = (e) => {
    e.preventDefault();

    const project = dataController.createNewProject(projectTitle.value);
    const projectCollection = dataController.getProjectCollection();

    domController.populateProjectContainer(projectCollection);
    closeProjectModal();
  };

  const showProjectMenu = (e) => {
    const target = e.target;

    if (
      target.id === 'project-menu-btn' &&
      target.nextElementSibling.classList.contains('popup-active')
    ) {
      target.nextElementSibling.classList.remove('popup-active');
    } else {
      target.nextElementSibling.classList.add('popup-active');
    }
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
    }

    if (target.id === 'show-task-info') {
      openInfoModal.open();
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

  taskContainer.addEventListener('click', handleTaskCardBtns);

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
