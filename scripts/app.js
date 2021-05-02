const addForm = document.getElementById("addForm");
let todos;

// check localStorage for todos
function checkLocalStorage () {
  if(localStorage.todos)
    todos = localStorage.getItem(todos);

}

//event listeners
window.addEventListener("DOMContentLoaded", checkLocalStorage);

addForm.addEventListener("submit", e => {
  e.preventDefault();

  //clear form
  addForm.reset();
})