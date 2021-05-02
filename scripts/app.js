const addForm = document.getElementById("addForm");

//event listeners
addForm.addEventListener("submit", e => {
  e.preventDefault();

  //clear form
  addForm.reset();
})