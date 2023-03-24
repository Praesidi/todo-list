import './styles/main.sass';
import dataController from './modules/dataController';
import domController from './modules/domController';
import storageController from './modules/storageController';

const loadFromLocalStorage = () => {
  // check if there is any item in the local storage
  if (
    localStorage.getItem('taskCollection') !== null ||
    localStorage.getItem('projectCollection') !== null
  ) {
    dataController.setProjectCollection(
      storageController.getProjectCollection()
    );
    dataController.setTaskCollection(storageController.getTaskCollection());
  }
};
