const addForm = document.getElementById("addForm");
const todoList = document.getElementById("todoList");
const todoFilter = document.getElementById("todoFilter");
const searchInput = document.getElementById("searchInput");
const searchInputReset = document.getElementById("searchInputReset");
let todos;

//event listeners
window.addEventListener("DOMContentLoaded", getLocalStorage);
addForm.addEventListener("submit", addTodo);
todoFilter.addEventListener("input", filterTodo);
searchInput.addEventListener("input", searchTodo);
searchInputReset.addEventListener("click", resetSearchInput);
todoList.addEventListener("click", e => {
  let todoLi = e.target.parentElement;
  let todoLiText = todoLi.firstElementChild.textContent;
  
  if(e.target.tagName === "BUTTON")
  if(e.target.classList.contains("check-btn")) 
  toggleTodo(todoLi, todoLiText);
  else if(e.target.classList.contains("remove-btn"))
  removeTodo(todoLi, todoLiText);
});

//check localStorage for todos
function checkLocalStorage() {
  if(localStorage.todos)
    todos = JSON.parse(localStorage.getItem("todos"));
  else 
    todos = [];
}

function getLocalStorage() {
  checkLocalStorage();

  // add each todo from localStorage to UI
  todos.forEach(todo => addTodoUI(todo));
}

// add todo
function addTodo(e) {
  e.preventDefault();

  //take value from input
  let newTodo = e.target.addInput.value;
  
  //add newTodo in todos
  todos.push({todoContent: newTodo, isCompleted: false});

  //update localStorage
  localStorage.setItem("todos", JSON.stringify(todos));

  //update UI
  addTodoUI(todos[todos.length - 1]);

  //clear form
  addForm.reset();
}

//update addTodo UI
function addTodoUI(todo) {
  // check todo.isCompleted and make html template
  let html;

  if(todo.isCompleted)
    html = `
    <li class="completed">
      <span>${todo.todoContent}</span>
      <button class="btn check-btn" type="button">
        <i class="fas fa-check"></i>
      </button>
      <button class="btn remove-btn" type="button">
      <i class="fas fa-trash"></i>
      </button>
    </li>
    `;
  else 
    html = `
    <li>
      <span>${todo.todoContent}</span>
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

  //update todos array
  arrayTodo.isCompleted = !arrayTodo.isCompleted;

  //update localStorage
  localStorage.setItem("todos", JSON.stringify(todos));

  //update UI
  li.classList.toggle("completed");
}

//remove todo
function removeTodo(li, liText) {
  let index = todos.findIndex(todo => todo.todoContent = liText);

  //remove from array
  todos.splice(index, 1);

  //update localStorage
  localStorage.setItem("todos", JSON.stringify(todos));

  //update UI
  removeTodoUI(li);
}

//update removeTodo UI
function removeTodoUI(li) {
  li.classList.add("moved");
  
  //add animation listener
  li.addEventListener("transitionend", () => li.remove());
}

//filter todos
function filterTodo() {
  let todoLis = todoList.children;
  
  for(let li of todoLis) {
    switch (todoFilter.value) {
      case "all":
        li.classList.remove("filtered");
        break;
      case "completed":
        if(!li.classList.contains("completed"))
          li.classList.add("filtered");
        else 
          li.classList.remove("filtered");
        break;
      case "uncompleted":
        if(li.classList.contains("completed"))
          li.classList.add("filtered");
        else 
          li.classList.remove("filtered");
        break;
    }
  }
}

function updateSearchTodoUI(searchValue) {
  let listItems = todoList.children;

  for (let child of listItems) {
    let itemContent = child.children[0].textContent.toLowerCase();

    if (itemContent.match(searchValue) || searchValue.length === 0) {
      child.style.display = "flex";
    } else {
      child.style.display = "none";
    }
  }
}

function searchTodo(e) {
  let searchTerm = e.target.value.trim().toLowerCase();

  updateSearchTodoUI(searchTerm);
}

function resetSearchInput() {
  searchInput.value = "";

  updateSearchTodoUI("");
}