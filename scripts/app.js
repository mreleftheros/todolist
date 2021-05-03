const addForm = document.getElementById("addForm");
const todoList = document.getElementById("todoList");
const todos = [
  {todoContent: "Go Shopping", isCompleted: false}
];

// check localStorage for todos


//event listeners
addForm.addEventListener("submit", addTodo);
todoList.addEventListener("click", e => {
  let todoLi = e.target.parentElement;
  let todoLiText = todoLi.firstElementChild.textContent;

  if(e.target.tagName === "BUTTON")
    if(e.target.classList.contains("check-btn")) 
      toggleTodo(todoLi, todoLiText);
    else if(e.target.classList.contains("remove-btn"))
      removeTodo(todoLi, todoLiText);
});

//functions

// add todo
function addTodo(e) {
  e.preventDefault();

  //take value
  let newTodo = e.target.addInput.value;
  
  //add newTodo in todos
  todos.push({todoContent: newTodo, isCompleted: false});

  //update UI
  addTodoUI(newTodo);

  //clear form
  addForm.reset();
}

//update addTodo UI
function addTodoUI(todo) {
  // create html template
  html = `
  <li>
    <span>${todo}</span>
    <button class="btn check-btn" type="button">
      <i class="fas fa-check"></i>
    </button>
    <button class="btn remove-btn" type="button">
     <i class="fas fa-trash"></i>
    </button>
  </li>
  `;

  //append html to UI
  todoList.innerHTML += html;
}

//change todo.isCompleted from array and update UI
function toggleTodo(li, liText) {
  let arrayTodo = todos.find(todo => todo.todoContent === liText);

  arrayTodo.isCompleted = !arrayTodo.isCompleted;
  li.classList.toggle("completed");
}

//remove todo
function removeTodo(li, liText) {
  let index = todos.findIndex(todo => todo.todoContent = liText);

  //remove from array
  todos.splice(index, 1);

  //update UI
  removeTodoUI(li);
}

//update removeTodo UI
function removeTodoUI(li) {
  li.classList.add("moved");
  
  //add animation listener
  li.addEventListener("transitionend", () => li.remove());
}