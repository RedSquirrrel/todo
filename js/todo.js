const listContainer = document.querySelector('.tasks');
const newTodoForm = document.querySelector('.addTodo');
const newTodoInput = document.querySelector('.addNew');
const listDisplayContainer = document.querySelector('.tasks');
const listCountElement = document.querySelector('.p');
const taskTemplate = document.querySelector('#task-template');
const alert = document.querySelector('.alert');
const completedTaskBtn = document.querySelector('.completed');
const activeTaskBtn = document.querySelector('.activeBtn');
const allTaskBtn = document.querySelector('.all');
const clearCompletedTaskBtn = document.querySelector('.clear');

new Sortable(listContainer, {
  animation: 150,
  ghostClass: 'blue-background-class',
});

const LOCAL_STORAGE_LIST = 'task.todos';

let todos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST)) || [
  {
    id: '1',
    name: 'Jog around the park 3x',
    completed: false,
  },
  {
    id: '2',
    name: '10 minutes meditation',
    completed: false,
  },
  {
    id: '3',
    name: 'Read for 1 hour',
    completed: false,
  },
  {
    id: '4',
    name: 'Pick up groceries',
    completed: false,
  },
  {
    id: '5',
    name: 'Complete Todo App on Frontend Mentor',
    completed: false,
  },
];

const createTask = name => {
  let id = todos.length + 1;
  return { id: id.toString(), name: name, completed: false };
};

const submitTodo = e => {
  e.preventDefault();
  const listName = newTodoInput.value;
  console.log(listName);
  if (listName === null || listName === '') {
    alert.style.display = 'block';
    setTimeout(() => {
      alert.style.display = 'none';
    }, 2000);
    return;
  }

  const task = createTask(listName);
  newTodoInput.value = null;
  todos.push(task);
  saveAndRender();
};

const isCompleted = e => {
  if (e.target.tagName.toLowerCase() === 'input') {
    const selectedTask = todos.find(task => task.id === e.target.id);
    selectedTask.completed = e.target.checked;
  }
  renderTaskCount();
  saveToLocalstorage();
};

const deleteTodo = e => {
  if (e.target.tagName.toLowerCase() === 'img') {
    const deleteTask = todos.filter(task => task.id !== e.target.id);
    todos = deleteTask;
    saveAndRender();
  }
  renderTaskCount();
  saveToLocalstorage();
};

// completedTaskBtn.addEventListener('click', e => {
//   todos = todos.filter(todo => todo.completed);
//   saveToLocalstorage();
//   saveAndRender();
// });

// activeTaskBtn.addEventListener('click', e => {
//   todos = todos.filter(todo => todo.completed);
//   saveToLocalstorage();
//   saveAndRender();
// });

// allTaskBtn.addEventListener('click', e => {
//   saveAndRender();
// });

const renderTaskCount = () => {
  const incompleteTaskCount = todos.filter(task => !task.completed).length;
  const taskString = incompleteTaskCount === 1 || incompleteTaskCount === 0 ? 'item' : 'items';
  listCountElement.innerHTML = `${incompleteTaskCount} ${taskString} left`;
};

const clearCompletedTodos = () => {
  const clearCompleted = todos.filter(task => !task.completed);
  todos = clearCompleted;
  saveAndRender();
};

const renderTasks = selectedList => {
  clearElement(listContainer);
  todos.forEach(todo => {
    const taskElement = document.importNode(taskTemplate.content, true);
    const checkbox = taskElement.querySelector('input');
    checkbox.id = todo.id;
    checkbox.checked = todo.completed;
    const label = taskElement.querySelector('label');
    label.htmlFor = todo.id;
    label.append(todo.name);
    const deleteBtn = taskElement.querySelector('img');
    deleteBtn.id = todo.id;
    listContainer.appendChild(taskElement);
  });
  renderTaskCount(selectedList);
  saveToLocalstorage();
};

const clearElement = element => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

const saveAndRender = () => {
  saveToLocalstorage();
  renderTasks();
};

const saveToLocalstorage = () => {
  localStorage.setItem(LOCAL_STORAGE_LIST, JSON.stringify(todos));
};

const render = () => {
  clearElement(listContainer);
  renderTasks();
  saveToLocalstorage();
};

clearCompletedTaskBtn.addEventListener('click', clearCompletedTodos);
newTodoForm.addEventListener('submit', submitTodo);
listContainer.addEventListener('click', isCompleted);
listContainer.addEventListener('click', deleteTodo);
render();
