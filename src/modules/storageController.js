const storageController = (() => {
  const saveToLocalStorage = (tasks, projects) => {
    // save items to local storage
    const taskCollection = JSON.stringify(tasks);
    const projectCollection = JSON.stringify(projects);

    localStorage.setItem('taskCollection', taskCollection);
    localStorage.setItem('projectCollection', projectCollection);
  };

  let retrievedTaskCollection = [];
  let retrievedProjectCollection = [];

  const readFromLocalStorage = () => {
    // get items from the local storage
    retrievedTaskCollection = JSON.parse(
      localStorage.getItem('taskCollection')
    );
    retrievedProjectCollection = JSON.parse(
      localStorage.getItem('projectCollection')
    );
  };

  return {
    saveToLocalStorage,
    readFromLocalStorage,
  };
})();

export default storageController;
