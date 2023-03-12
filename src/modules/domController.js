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
        <div class="task-item-check">
          <input type="checkbox" ${task.isDone ? ' checked' : ''}/>
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
          <button title="Mark as important" id="mark-important-task">
            <i class="fa-regular fa-star fa-fw"></i>
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

  const editTask = () => {};

  const deleteTask = () => {};

  const createProject = (project) => {
    const projectItem = String.raw`
      <div class="project-item" data-id="${project.id}">
        <div class="project-info">
          <p>Project Name</p>
        </div>
        <div class="project-menu">
          <button>
            <i class="fa-solid fa-ellipsis-vertical"></i>
          </button>
          <div class="project-popup-menu">
            <button>Edit</button>
            <button>Delete</button>
          </div>
        </div>
      </div>
    `;

    return projectItem;
  };

  const editProject = () => {};

  const deleteProject = () => {};

  const populateTaskContainer = (taskArray) => {
    taskContainer.textContent = '';
    taskArray.forEach((task) => {
      taskContainer.innerHTML += createTask(task);
    });
  };

  const populateProjectContainer = (projectCollection) => {
    projectContainer.textContent = '';
    projectArray.forEach((project) => {
      projectContainer.innerHTML += createProject(project);
    });
  };

  return {
    editTask,
    deleteTask,
    createTask,
    editProject,
    createProject,
    deleteProject,
    populateTaskContainer,
    populateProjectContainer,
  };
})();

export default domController;
