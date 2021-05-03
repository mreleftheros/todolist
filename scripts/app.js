const addForm = document.getElementById("addForm");
const todoList = document.getElementById("todoList");
const todos = [
  {todoContent: "Go Shopping", isCompleted: false}
];

// check localStorage for todos


//event listeners
addForm.addEventListener("submit", addTodo);
todoList.addEventListener("click", e => {
  if(e.target.tagName === "BUTTON")
    if(e.target.classList.contains("check-btn")) 
      toggleTodo(e);
    else if(e.target.classList.contains("remove-btn"))
      removeTodo(e);
});

//functions


function addTodo(e) {
  e.preventDefault();

  //take value
  let newTodo = e.target.addInput.value;
  
  //add newTodo in todos
  todos.push({todoContent: newTodo, isCompleted: false});

  //update the UI
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
function toggleTodo(e) {
  let todoLi = e.target.parentElement;
  let todoLiText = todoLi.firstElementChild.textContent;
  //check if todo isCompleted and change it
  let arrayTodo = todos.find(todo => todo.todoContent === todoLiText);
  arrayTodo.isCompleted = !arrayTodo.isCompleted;
  todoLi.classList.toggle("completed");
}

