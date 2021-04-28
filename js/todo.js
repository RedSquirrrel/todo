const addForm = document.querySelector('.addTodo');
// const input = document.getElementById('addNew');
// const btn = document.querySelector('.addNewBtn');
const ul = document.querySelector('.tasks');
const alert = document.querySelector('.alert');
const itemsLeft = document.querySelector('.items_left');
const checkbox = document.querySelectorAll('.task-input');
// const li = document.querySelector('.task');
// console.log(li);

new Sortable(ul, {
  animation: 350,
  ghostClass: 'blue-background-class',
});

const generateTemplate = todo => {
  let id = ul.children.length + 1;

  const html = `
          <li class="task">
             <input class="task-input" type="checkbox" id="task_${id}" />
             <label for="task_${id}">
               <span class="custom_checkbox"></span>
               ${todo}
             </label>
            <span class="deleteBtn">
              <img class="delete" src="./images/icon-cross.svg" alt="" />
            </span>
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
    // itemLeft(todo);
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
  const array = Array.from(e.target.parentElement.children);
  // console.log(array);

  array.map((m, i) => {
    m.addEventListener('click', e => {
      if (m.checked && e.target.classList.contains('task-input')) {
        e.target.parentElement.classList.add('completedTask');
        // console.log('array', m);
        // console.log('eee', e.target.checked);
      } else {
        e.target.parentElement.classList.remove('completed');
      }
      // if (!m.checked && e.target.classList.contains('task-input')) {
      //   e.target.parentElement.classList.toggle('completedTask');
      // }
    });
  });

  if (e.target.classList.contains('delete')) {
    e.target.parentElement.parentElement.remove();
    // console.log(e.target);
  }
});
