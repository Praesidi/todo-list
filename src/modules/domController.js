import { format } from 'date-fns';

const domController = (() => {
  const taskContainer = document.getElementById('task-container');
  const projectContainer = document.getElementById('project-container');

  const createTask = (task) => {
    let dueDate;

    if (task.dueDate !== '') {
      dueDate = format(new Date(task.dueDate), 'dd/MM/yyyy');
    }

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
        <div class="task-item-checkbox ${task.isDone ? ' finished' : ''}">
          <input type="checkbox" id="task-checkbox" ${
            task.isDone ? ' checked' : ''
          }/>
          <p>${task.title}</p>
        </div>
        <div class="task-date-container">
          <span id="task-date-el">${
            task.dueDate === ''
              ? 'Due Date: Not Selected'
              : `Due Date: ${dueDate}`
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

  const createAddTaskBtn = (element) => {
    const addBtn = String.raw`
      <button id="add-task-btn">
        <i class="fa-regular fa-plus"></i>
        Create New Task
      </button>
    `;

    element.textContent = '';
    element.innerHTML = addBtn;
  };

  const createDeleteTasksBtn = (element) => {
    const deleteBtn = String.raw`
      <button id="delete-tasks-btn">
        <i class="fa-regular fa-trash-can"></i>
        Delete Finished Tasks
      </button>
    `;

    element.textContent = '';
    element.innerHTML = deleteBtn;
  };

  return {
    deleteTask,
    createTask,
    createProject,
    deleteProject,
    createAddTaskBtn,
    markTaskImportant,
    createDeleteTasksBtn,
    populateTaskContainer,
    populateProjectContainer,
  };
})();

export default domController;
