const addForm = document.querySelector('.addTodo');
// const input = document.getElementById('addNew');
// const btn = document.querySelector('.addNewBtn');
const ul = document.querySelector('.tasks');
const alert = document.querySelector('.alert');
const itemsLeft = document.querySelector('.items_left');

/* 
- create todo
- delete todo
- toggle
*/
const generateTemplate = todo => {
  let id = ul.children.length + 1;
  const html = `
      <li class="task">
         <input class="task-input" type="checkbox" id="task_${id}" />
         <label for="task_${id}">
         <span class="custom_checkbox"></span> ${todo}</label>
         <span class="deleteBtn"><i class="fas fa-times delete"></i></span>
     </li>    
  `;

  ul.innerHTML += html;
};

addForm.addEventListener('submit', (e, selectedTask) => {
  e.preventDefault();

  const todo = addForm.add.value.trim();

  // check for todo and remove todo
  if (todo.length) {
    generateTemplate(todo);

    addForm.reset();
    alert.style.display = 'none';
  } else {
    alert.style.display = 'block';
    setTimeout(() => {
      alert.style.display = 'none';
    }, 2000);
  }
});

// delete todos
ul.addEventListener('click', e => {
  if (e.target.classList.contains('delete')) {
    e.target.parentElement.parentElement.remove();
  }
});
