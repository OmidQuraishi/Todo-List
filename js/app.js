"use strict";
const addBtn = document.querySelector(".addBtn");
const input = document.querySelector(".form input");
const message = document.querySelector(".message");
const taskMessage = document.querySelector(".task-length");
let mark = document.querySelector(".task");
const errors = [
  "Fill The Input",
  "Dont Write More Then 25 Character",
  "Dont Write Less Then 3 Character",
];

// todos array
let todos = [];
todos = JSON.parse(localStorage.getItem("todos"));
// error message
function error(index) {
  message.textContent = errors[index];
  message.style.opacity = 1;
}
// add task event
addBtn.addEventListener("click", function () {
  if (input.value.length == "") {
    error(0);
  } else if (input.value.length > 25) {
    error(1);
  } else if (input.value.length < 3) {
    error(2);
  } else {
    // todos.push(input.value);
    addTask();
    input.value = "";
    error();
  }
});

// add task in to array function
function addTask() {
  const todo = {
    title: input.value,
    states: "active",
  };
  todos.push(todo);
  checkLocalStorage();
  showTask();
}

// check the lenght of local storage
function checkLocalStorage() {
  if (localStorage.length == 0) {
    localStorage.setItem("todos", "[]");
  } else {
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}
checkLocalStorage();
// show task in webpage
function showTask() {
  mark.querySelectorAll(".task-body").forEach((ele) => ele.remove());
  todos.forEach((ele, index) => {
    mark.innerHTML += `
  <div class="task-body">
        <div class="task-title ${ele.states}">
            <i class="fa fa-check ${ele.states}" onclick="checkTask(${index})" aria-hidden="true"></i>
            <h1>${ele.title}</h1>
        </div>
        <i class="fa fa-trash ${ele.states} remove" onclick="removeTask(${index})" aria-hidden="true"></i>
  </div>
    `;
  });
}
showTask();

// delete task
function removeTask(index) {
  todos.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  todos = JSON.parse(localStorage.getItem("todos"));
  showTask();
}
// change states task
function checkTask(index) {
  todos[index].states = "deactive";
  localStorage.setItem("todos", JSON.stringify(todos));
  todos = JSON.parse(localStorage.getItem("todos"));
  showTask();
}
