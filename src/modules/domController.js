// this module controls adding and deleting tasks and projects in DOM

const domController = (() => {
  const taskContainer = document.getElementById('task-container');
  const projectContainer = document.getElementById('project-container');

  const createTask = (task) => {
    const taskItem = String.raw`
      <div class="task-item 
        ${
          task.priority === 'low'
            ? 'task-low-priority'
            : task.priority === 'medium'
            ? 'task-medium-priority'
            : 'task-high-priority'
        }" 
        data-id="${task.id}"
      >
        <div class="task-item-checkbox">
          <input type="checkbox" id="task-checkbox" ${
            task.isDone ? ' checked' : ''
          }/>
          <p>${task.title}</p>
        </div>
        <div class="task-date-container">
          <span id="task-date-el">${
            task.dueDate === ''
              ? 'Due Date: Not Selected'
              : `Due Date: ${task.dueDate}`
          }</span>
            </div>
        <div class="task-item-btns">
          <button title="Edit" id="edit-task">
            <i class="fa-solid fa-pen-to-square fa-fw"></i>
          </button>
          <button title="Show info" id="show-task-info">
            <i class="fa-solid fa-circle-info fa-fw"></i>
          </button>
          <button title="Mark as important" id="mark-important-btn">
            <i class=" ${
              task.isImportant === true
                ? 'fa-solid fa-star fa-fw important'
                : 'fa-regular fa-star fa-fw'
            }"></i>
          </button>
          <button title="Delete" id="delete-task">
            <i class="fa-solid fa-trash-can fa-fw"></i>
          </button>
        </div>
      </div>
    `;

    // if task marked as important then use <i class="fa-solid fa-star"></i>

    return taskItem;
  };

  const deleteTask = (task) => {
    task.remove();
  };

  const markTaskImportant = (taskBtn, ...rest) => {
    const [status] = rest;
    if (status) {
      taskBtn.classList.remove('fa-regular');
      taskBtn.classList.add('important', 'fa-solid');
    } else {
      taskBtn.classList.remove('important', 'fa-solid');
      taskBtn.classList.add('fa-regular');
    }
  };

  const createProject = (project) => {
    const projectItem = String.raw`
      <div class="project-item" data-id="${project.id}">
        <div class="project-info">
          <p>${project.title}</p>
        </div>
        <div class="project-menu">
          <button id="project-menu-btn">
            <i class="fa-solid fa-ellipsis-vertical"></i>
          </button>
          <div class="project-popup-menu" id="project-menu">
            <button id="project-edit-btn">Edit</button>
            <button id="project-delete-btn">Delete</button>
          </div>
        </div>
      </div>
    `;

    return projectItem;
  };

  const deleteProject = (project) => {
    project.remove();
  };

  const populateTaskContainer = (taskCollection) => {
    taskContainer.textContent = '';
    taskCollection.forEach((task) => {
      taskContainer.innerHTML += createTask(task);
    });
  };

  const populateProjectContainer = (projectCollection) => {
    projectContainer.textContent = '';
    projectCollection.forEach((project) => {
      projectContainer.innerHTML += createProject(project);
    });
  };

  const setCurrentFolder = (e) => {
    const selectedFolder = e.target;
    const folderID = selectedFolder.getAttribute('id');

    // const unselectAllFolder = () => {};

    // if (folderID === 'inbox') {
    //   selectedFolder;
    // }
  };

  return {
    deleteTask,
    createTask,
    createProject,
    deleteProject,
    markTaskImportant,
    populateTaskContainer,
    populateProjectContainer,
  };
})();

export default domController;
