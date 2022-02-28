let tasklist = document.getElementById("tasklist");
let heading = document.getElementById("heading");
let addtaskButton = document.getElementById("addtaskButton");
let modal = document.getElementById("myModal");
let notaskmessage = document.getElementById("message");
let deleteButtonID = 0; //
let completed = 0;
let id = 0;
let no_task_image = document.getElementById("no_task_left");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Adding new row to table for each task
let addTask = (getTaskValue, getDescriptionValue) => {
  // add new row
  let newRowDiv = document.createElement("div");
  newRowDiv.classList.add("row");
  let newRow = tasklist.append(newRowDiv);

  // add 4 divs into the new row
  let checkbuttonDiv = document.createElement("div");
  let taskDiv = document.createElement("div");
  let desciptionDiv = document.createElement("div");
  let deleteButtonDiv = document.createElement("div");
  newRowDiv.append(checkbuttonDiv, taskDiv, desciptionDiv, deleteButtonDiv);

  //// adding checkbutton to new row
  let checkbutton = document.createElement("button");
  checkbuttonDiv.classList.add("center");
  checkbuttonDiv.appendChild(checkbutton);
  checkbutton.classList.add("tick");
  checkbutton.addEventListener("click", expand);
  //// adding task info to new row
  taskDiv.append(getTaskValue);
  //// adding desciption  to new row
  desciptionDiv.append(getDescriptionValue);

  //// adding delete button to new row
  let deleteButton = document.createElement("button");
  checkbuttonDiv.classList.add("center");
  deleteButtonDiv.appendChild(deleteButton);

  deleteButton.innerText = "Delete  ";
  deleteButton.addEventListener("click", deleteTask);
  deleteButton.classList.add("deleteButton");
  deleteButton.setAttribute("id", deleteButtonID);
  deleteButtonID++;
};

let completedBox = document.getElementById("completedTask");

function expand(click) {
  click.target.parentElement.parentElement.style.textDecoration =
    "line-through";
  setTimeout(() => {
    click.target.setAttribute("class", "tickactive");
  }, 500);
  setTimeout(() => {
    click.target.setAttribute("class", "tickactive2");
  }, 1000);
  setTimeout(() => {
    click.target.parentElement.parentElement.setAttribute("id", "rowgone");
  }, 2000);
  setTimeout(() => {
    click.target.parentElement.parentElement.remove();
    check_all_task_completed();
  }, 3000);
  completed++;
  notaskmessage.innerText =
    "Congratulations! You have completed all your tasks";
  completedBox.innerText = completed;
}

function check_if_empty() {
  if (document.querySelectorAll(".deleteButton").length === 0) {
    heading.style.display = "none";
    no_task.style.display = "block";
  }
}
function check_all_task_completed() {
  if (document.querySelectorAll(".tick").length === 0) {
    heading.style.display = "none";
    no_task.style.display = "block";
    no_task_image.setAttribute("src", "/src/alltaskcompleted.png");
  }
}
//---- modal Section ----//

var btn = document.getElementById("myBtn"); // button for modal

span.onclick = function () {
  // close button
  modal.style.display = "none";
};

addtaskButton.onclick = function () {
  modal.style.display = "block";
  getTaskValue.focus();
};

// trying to use object and class
let taskArray = [];
let CompletedTaskArray = [];
let isFresh = true; // turn to false when the first task is added

class task {
  constructor(deleteButtonID, taskName, description) {
    this.deleteButtonID = deleteButtonID;
    this.taskName = taskName;
    this.description = description;
  }
}

let saveButton = document.getElementById("save");
saveButton.addEventListener("click", addrow);

let getTaskValue = document.getElementById("getTask");
let getDescriptionValue = document.getElementById("getDescription");
getTaskValue.addEventListener("keyup", check);
getTaskValue.addEventListener("keypress", addrow);
let no_task = document.getElementById("no-task");
function addrow(e) {
  getTaskValue.focus();
  if (
    (e.key === "Enter" && getTaskValue.value.length !== 0) ||
    e.type === "click"
  ) {
    taskArray[taskArray.length] = new task(
      deleteButtonID,
      getTaskValue.value,
      getDescriptionValue.value
    );
    addTask(getTaskValue.value, getDescriptionValue.value);
    saveButton.disabled = true;
    getTaskValue.value = ""; //clear input field
    getDescription.value = ""; //clear input field
    saveButton.style.color = "rgba(0, 0, 0, 0.2)";
    no_task.style.display = "none";
    heading.style.display = "grid";
  }
}

let deleteTask = (click) => {
  let getID = parseInt(click.target.id);
  if (click.target.className === "deleteButton") {
    click.target.parentElement.parentElement.remove();
    taskArray.forEach((element, index) => {
      if (element.deleteButtonID === getID) {
        taskArray.splice(index, 1);
      }
    });
  }
  check_if_empty();
};

function check() {
  if (getTaskValue.value.length === 0) {
    saveButton.style.color = "rgba(0, 0, 0, 0.2)";
    saveButton.disabled = true;
  } else {
    saveButton.style.color = "rgba(60, 60, 60,0.8)";
    saveButton.style.fontWeight = "bold";
    saveButton.disabled = false;
  }
}
