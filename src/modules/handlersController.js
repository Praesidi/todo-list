import dataController from './dataController.js';
import domController from './domController.js';
import storageController from './storageController.js';

const handlersController = (() => {
  // task modal
  const taskContainer = document.getElementById('task-container');
  const addTaskBtn = document.getElementById('add-task-btn');
  const closeTaskModalBtn = document.getElementById('close-task-modal-btn');
  const taskModal = document.getElementById('task-modal');
  const taskForm = document.getElementById('task-form');
  // project modal
  const projectContainer = document.getElementById('project-container');
  const addProjectBtn = document.getElementById('add-project-btn');
  const closeProjectModalBtn = document.getElementById(
    'close-project-modal-btn'
  );
  const projectModal = document.getElementById('project-modal');
  const projectForm = document.getElementById('project-form');
  // info modal
  const closeInfoModalBtn = document.getElementById('close-info-modal-btn');
  const infoModal = document.getElementById('info-modal');

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

    if (target.id !== 'project-menu-btn') {
      return false;
    }

    if (
      !target.nextElementSibling.classList.contains('popup-active') &&
      numActiveMenus <= 1
    ) {
      hideProjectsMenu();
      target.nextElementSibling.classList.add('popup-active');
    } else {
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

  const closeInfoModal = () => {
    infoModal.close();
  };

  // task info modal strings
  const infoModalTitle = document.getElementById('info-modal-title');
  const infoModalDescription = document.getElementById(
    'info-modal-description'
  );
  const infoModalPriority = document.getElementById('info-modal-priority');
  const infoModalDate = document.getElementById('info-modal-date');
  const infoModalProject = document.getElementById('info-modal-project');

  const openInfoModal = (obj) => {
    if (taskModal.open || projectModal.open) {
      closeProjectModal();
      closeTaskModal();
    }

    infoModalTitle.textContent = obj.title;
    infoModalPriority.textContent = obj.priority;
    infoModalProject.textContent = dataController.getProjectObject(
      obj.project
    ).title;

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
    }

    domController.populateTaskContainer(
      dataController.sortTaskCollection(dataController.getCurrentProject())
    );
    storageController.saveToLocalStorage(
      dataController.getTaskCollection(),
      dataController.getProjectCollection()
    );
    taskToEdit = {};
  };

  // project form inputs
  const projectTitle = document.getElementById('project-title');

  const handleProjectForm = (e) => {
    e.preventDefault();
    const projectCollection = dataController.getProjectCollection();
    let projectToSelect = {};

    if (projectModalMode === 'create') {
      const project = dataController.createNewProject(projectTitle.value);

      const _projectCollection = dataController.getProjectCollection(); // collection after adding new project
      const lastProject = _projectCollection[_projectCollection.length - 1];
      dataController.setCurrentProject(lastProject.id); // last project is active project now
      projectToSelect = lastProject;
    }

    if (projectModalMode === 'edit') {
      dataController.editProject(projectToEdit, projectTitle.value);
      dataController.setCurrentProject(projectToEdit.id); // test
      projectToSelect = projectToEdit;
    }

    domController.populateProjectContainer(projectCollection);
    // select created or edited project
    const lastProjectCard = document
      .querySelector('[data-id="' + projectToSelect.id + '"]')
      .click();
    projectToEdit = {};
    storageController.saveToLocalStorage(
      dataController.getTaskCollection(),
      dataController.getProjectCollection()
    );
    closeProjectModal();
  };

  let currentPageMode = 'inbox';

  const updateContainer = (projectID) => {
    if (currentPageMode !== 'project') {
      domController.populateTaskContainer(
        dataController.sortTaskCollection(`${currentPageMode}`)
      );
    }

    if (currentPageMode === 'project') {
      domController.populateTaskContainer(
        dataController.sortTaskCollection(`${projectID}`)
      );
    }
  };

  const handleTaskCardBtns = (e) => {
    // checks if any button in the task card were clicked
    const target = e.target;
    const taskID = target.parentNode.parentNode.getAttribute('data-id');
    const taskCard = target.parentNode.parentNode;
    const taskObj = dataController.getTaskObject(taskID);

    if (target.id === 'task-checkbox') {
      if (target.checked) {
        dataController.markTaskDone(taskObj); // mark not done
        updateContainer(taskObj.project);
      } else {
        dataController.markTaskDone(taskObj, 1); // mark done
        updateContainer(taskObj.project);
      }
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
        domController.markTaskImportant(target.firstElementChild);
        updateContainer(taskObj.project);
      } else {
        dataController.markTaskImportant(taskObj, 1);
        domController.markTaskImportant(target.firstElementChild, 1);
        updateContainer(taskObj.project);
      }
    }

    if (target.id === 'delete-task') {
      dataController.deleteTask(taskID);
      domController.deleteTask(taskCard);
    }

    storageController.saveToLocalStorage(
      dataController.getTaskCollection(),
      dataController.getProjectCollection()
    );
  };

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
      dataController.deleteTaskGroup(projectID);
      storageController.saveToLocalStorage(
        dataController.getTaskCollection(),
        dataController.getProjectCollection()
      );
      const inbox = document.getElementById('inbox').click();
    }
  };

  const hamburgerMenuBtn = document.getElementById('hamburger-menu-btn');
  const sidebar = document.getElementById('sidebar');

  // shows and hides the sidebar
  const handleHamburgerMenu = () => {
    if (!hamburgerMenuBtn.checked) {
      sidebar.style.display = 'none';
    } else {
      sidebar.style.display = 'block';
    }
  };

  // close the sidebar when the user selects category or project
  const closeSidebarForMobiles = () => {
    if (window.matchMedia('screen and (max-width:420px)').matches) {
      hamburgerMenuBtn.checked = false;
      sidebar.style.display = 'none';
    }
  };

  // fix a bug when after resize the sidebar disappears
  const showSidebarAfterResize = () => {
    if (window.matchMedia('screen and (min-width:860px)').matches) {
      sidebar.style.display = 'block';
      if (sidebar.style.display === 'block') {
        hamburgerMenuBtn.checked = true;
      } else {
        hamburgerMenuBtn.checked = false;
      }
    }
  };

  const pageTitle = document.getElementById('page-title');
  const addBtnContainer = document.getElementById('add-task-btn-container');

  const handleCategorySelectors = (e) => {
    const target = e.target;
    const projectID = target.getAttribute('data-id');
    const projectObj = dataController.getProjectObject(projectID);

    if (projectID !== null) {
      dataController.setCurrentProject(projectID);
      domController.createAddTaskBtn(addBtnContainer);
      pageTitle.textContent = projectObj.title;
      currentPageMode = 'project';

      if (dataController.getTaskCollection().length !== 0) {
        domController.populateTaskContainer(
          dataController.sortTaskCollection(projectID)
        );
      }
      closeSidebarForMobiles();
    }

    if (target.id === 'inbox') {
      addBtnContainer.textContent = '';
      pageTitle.textContent = 'Inbox';
      currentPageMode = 'inbox';
      domController.populateTaskContainer(
        dataController.sortTaskCollection('inbox')
      );
      closeSidebarForMobiles();
    }

    if (target.id === 'today') {
      addBtnContainer.textContent = '';
      pageTitle.textContent = 'Today';
      currentPageMode = 'today';
      domController.populateTaskContainer(
        dataController.sortTaskCollection('today')
      );
      closeSidebarForMobiles();
    }

    if (target.id === 'upcoming') {
      addBtnContainer.textContent = '';
      pageTitle.textContent = 'Upcoming';
      currentPageMode = 'upcoming';
      domController.populateTaskContainer(
        dataController.sortTaskCollection('upcoming')
      );
      closeSidebarForMobiles();
    }

    if (target.id === 'completed') {
      domController.createDeleteTasksBtn(addBtnContainer);
      pageTitle.textContent = 'Completed';
      currentPageMode = 'completed';
      domController.populateTaskContainer(
        dataController.sortTaskCollection('completed')
      );
      closeSidebarForMobiles();
    }

    if (target.id === 'important') {
      addBtnContainer.textContent = '';
      pageTitle.textContent = 'Important';
      currentPageMode = 'important';
      domController.populateTaskContainer(
        dataController.sortTaskCollection('important')
      );
      closeSidebarForMobiles();
    }
  };

  document.addEventListener('click', (e) => {
    if (e.target.id !== 'project-menu-btn') {
      hideProjectsMenu();
    }
  });
  window.addEventListener('resize', showSidebarAfterResize);
  sidebar.addEventListener('click', handleCategorySelectors);
  taskContainer.addEventListener('click', handleTaskCardBtns);
  projectContainer.addEventListener('click', handleProjectCardBtns);
  projectContainer.addEventListener('click', showProjectMenu);

  addBtnContainer.addEventListener('click', (e) => {
    if (e.target.id === 'add-task-btn') {
      openTaskModal();
    }

    if (e.target.id === 'delete-tasks-btn') {
      dataController.deleteFinishedTasks();
      taskContainer.textContent = '';
      storageController.saveToLocalStorage(
        dataController.getTaskCollection(),
        dataController.getProjectCollection()
      );
    }
  });
  addProjectBtn.addEventListener('click', openProjectModal);
  closeTaskModalBtn.addEventListener('click', closeTaskModal);
  closeProjectModalBtn.addEventListener('click', closeProjectModal);
  closeInfoModalBtn.addEventListener('click', closeInfoModal);
  hamburgerMenuBtn.addEventListener('click', handleHamburgerMenu);

  taskForm.addEventListener('submit', handleTaskForm);
  projectForm.addEventListener('submit', handleProjectForm);
})();

export default handlersController;
