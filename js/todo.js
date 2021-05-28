const listContainer = document.querySelector('.tasks');
const newTodoForm = document.querySelector('.addTodo');
const newTodoInput = document.querySelector('.addNew');
// const listDisplayContainer = document.querySelector('.tasks');
const listCountElement = document.querySelector('.p');
const taskTemplate = document.querySelector('#task-template');
const alert = document.querySelector('.alert');
const showCompletedTodos = document.querySelector('.completed');
const showActiveTodos = document.querySelector('.activeBtn');
const allTaskBtn = document.querySelector('.all');
const clearCompletedTaskBtn = document.querySelector('.clear');
const filterOptions = document.querySelector('.filter-todos');

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

const focusInput = () => {
  newTodoInput.focus();
};

const createTask = name => {
  let id = todos.length + 1;
  return { id: id.toString(), name: name, completed: false };
};

const submitTodo = e => {
  e.preventDefault();
  const listName = newTodoInput.value;
  console.log(listName);
  if (listName === null || listName === '') {
    alert.textContent = 'Write a task first';
    alert.style.display = 'block';
    setTimeout(() => {
      alert.style.display = 'none';
    }, 2000);
    focusInput();
    return;
  }

  const task = createTask(listName);
  newTodoInput.value = null;
  todos.push(task);
  focusInput();
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
    focusInput();
    saveAndRender();
  }
  renderTaskCount();
  saveToLocalstorage();
};

const filterTodos = e => {
  listContainer.innerHTML = '';
  todos.filter((todo, id) => {
    // console.log(todo);
    // console.log(id + 1);
    // console.log(e.target);
    if (e.target.classList.contains('all')) {
      showActiveTodos.classList.remove('active');
      allTaskBtn.classList.add('active');
      showCompletedTodos.classList.remove('active');
      console.log('All');
      saveAndRender();
    }

    if (e.target.classList.contains('activeBtn')) {
      console.log('Active');
      showActiveTodos.classList.add('active');
      allTaskBtn.classList.remove('active');
      showCompletedTodos.classList.remove('active');
      if (todo.completed === false) {
        listContainer.innerHTML += `
        <li class="task">
          <input class="task-input" type="checkbox" />
           <label>
             <span class="custom_checkbox"></span>
              ${todo.name}
             </label>
          <span class="deleteBtn">
            <img class="delete" src="./images/icon-cross.svg" alt="" />
          </span>
       </li>`;
        console.log(todo.name);
      }
    }

    if (e.target.classList.contains('completed')) {
      showActiveTodos.classList.remove('active');
      allTaskBtn.classList.remove('active');
      showCompletedTodos.classList.add('active');
      console.log('Completed');
      if (todo.completed === true) {
        listContainer.innerHTML += `
        <li class="task">
        <input class="task-input" type="checkbox" />
         <label>
           <span class="custom_checkbox"></span>
            ${todo.name}
           </label>
        <span class="deleteBtn">
          <img class="delete" src="./images/icon-cross.svg" alt="" />
        </span>
     </li>`;
        console.log(todo);
      }
    }
  });
  renderTaskCount();
};

const renderTaskCount = () => {
  const incompleteTaskCount = todos.filter(task => !task.completed).length;
  const taskString = incompleteTaskCount === 1 || incompleteTaskCount === 0 ? 'item' : 'items';
  listCountElement.innerHTML = `${incompleteTaskCount} ${taskString} left`;
};

const clearCompletedTodos = () => {
  const clearCompleted = todos.filter(task => !task.completed);
  if (clearCompleted.length === todos.length) {
    alert.style.display = 'block';
    alert.textContent = 'Tick one or more items first';
    setTimeout(() => {
      alert.style.display = 'none';
    }, 1500);
  }

  if (clearCompleted.length !== todos.length) {
    alert.style.display = 'block';
    alert.textContent = `Deleted`;
    setTimeout(() => {
      alert.style.display = 'none';
    }, 1500);
  }

  if (clearCompleted.length === 0 && todos.length === 0) {
    alert.style.display = 'block';
    alert.textContent = `No item left`;
    setTimeout(() => {
      alert.style.display = 'none';
    }, 1500);
  }
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
  focusInput();
};

clearCompletedTaskBtn.addEventListener('click', clearCompletedTodos);
newTodoForm.addEventListener('submit', submitTodo);
listContainer.addEventListener('click', isCompleted);
listContainer.addEventListener('click', deleteTodo);
filterOptions.addEventListener('click', filterTodos);

render();
