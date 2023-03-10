// this module controls modals, settings, event listeners

const handlersController = (() => {
  const addTaskBtn = document.getElementById('add-task-btn');
  const addProjectBtn = document.getElementById('new-project-btn');
  const taskModal = document.getElementById('task-modal');
  const projectModal = document.getElementById('project-modal');
  const closeTaskModalBtn = document.getElementById('close-task-modal-btn');
  const closeProjectModalBtn = document.getElementById(
    'close-project-modal-btn'
  );

  const closeTaskModal = () => {
    taskModal.close();
  };

  const closeProjectModal = () => {
    projectModal.close();
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

  addTaskBtn.addEventListener('click', openTaskModal);
  addProjectBtn.addEventListener('click', openProjectModal);

  closeTaskModalBtn.addEventListener('click', closeTaskModal);
  closeProjectModalBtn.addEventListener('click', closeProjectModal);
})();

export default handlersController;
