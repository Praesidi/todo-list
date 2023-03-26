import './styles/main.sass';
import handlersController from './modules/handlersController';
import dataController from './modules/dataController';
import domController from './modules/domController';
import storageController from './modules/storageController';
import logo from './img/logo.png';
import favicon from './img/favicon.png';

const createDefaultProject = () => {
  const defaultTestCollection = [
    {
      title: 'test task',
      id: '000000001',
      project: '00001',
      description: 'write anything you want',
      priority: 'medium',
      dueDate: '',
      isImportant: true,
      isDone: false,
    },
  ];
  const defaultProjectCollection = [{ title: 'test project', id: '00001' }];

  dataController.setTaskCollection(defaultTestCollection);
  dataController.setProjectCollection(defaultProjectCollection);
  domController.populateTaskContainer(dataController.getTaskCollection());
  domController.populateProjectContainer(dataController.getProjectCollection());
};

const checkLocalStorage = () => {
  let tasks = JSON.parse(localStorage.getItem('taskCollection'));
  let projects = JSON.parse(localStorage.getItem('projectCollection'));
  if (tasks !== null || projects !== null) {
    dataController.setTaskCollection(tasks);
    dataController.setProjectCollection(projects);
    domController.populateTaskContainer(dataController.getTaskCollection());
    domController.populateProjectContainer(
      dataController.getProjectCollection()
    );
  } else {
    createDefaultProject();
  }
};

checkLocalStorage();
