class task {
  constructor(rowID, taskName, description) {
    this.rowID = rowID;
    this.taskName = taskName;
    this.description = description;
    this.isCompleted = false;
  }
}
let completedBox = document.getElementById("completedTask");
let tasklist = document.getElementById("tasklist");
let heading = document.getElementById("heading");
let addtaskButton = document.getElementById("addtaskButton");
let modal = document.getElementById("myModal");
let notaskmessage = document.getElementById("message");
let rowID = 0; //
let completed = 0;
let id = 0;
let no_task_image = document.getElementById("no_task_left");
// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];
// trying to use object and class
let taskArray = [];

//Function for adding new row to table for each task *************************
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
  newRowDiv.setAttribute("id", rowID);
  rowID++;
  newRowDiv.append(checkbuttonDiv, taskDiv, desciptionDiv, deleteButtonDiv);
  //// adding checkbutton to new row
  let checkbutton = document.createElement("button");
  checkbuttonDiv.classList.add("center");
  checkbuttonDiv.appendChild(checkbutton);
  checkbutton.classList.add("tick");
  checkbutton.addEventListener("click", done);
  //// adding task info to new row
  taskDiv.append(getTaskValue);
  //// adding desciption  to new row
  desciptionDiv.append(getDescriptionValue);
  //// adding delete button to new row
  let deleteButton = document.createElement("button");
  checkbuttonDiv.classList.add("center");
  deleteButtonDiv.appendChild(deleteButton);
  deleteButton.addEventListener("click", deleteTask);
  deleteButton.classList.add("deleteButton");
};

function addrow(e) {
  // Pressing enter or clicking save create new row and save to taskArray
  getTaskValue.focus();
  if (
    (e.key === "Enter" && getTaskValue.value.length !== 0) ||
    e.type === "click"
  ) {
    taskArray[taskArray.length] = new task(
      rowID,
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
  //click on delete button remove row and remove element in array
  let getID = click.target.parentElement.parentElement.id;
  if (click.target.className === "deleteButton") {
    click.target.parentElement.parentElement.remove();
    taskArray.forEach((element, index) => {
      if (element.rowID == getID) {
        taskArray.splice(index, 1);
      }
    });
  }
  check_all_task_completed();
};

function done(click) {
  /* Function for ticking task ********************************************************
  -icon change when tick
  -text got striked 
  */

  click.target.disabled = true;

  click.target.parentElement.parentElement.style.textDecoration =
    "line-through";
  setTimeout(() => {
    click.target.setAttribute("class", "tickactive");
  }, 100);
  setTimeout(() => {
    click.target.setAttribute("class", "tickactive2");
  }, 500);
  setTimeout(() => {
    click.target.parentElement.parentElement.setAttribute("id", "rowgone");
  }, 1000);
  setTimeout(() => {
    click.target.parentElement.parentElement.remove();
    check_all_task_completed();
  }, 1500);
  let getrowID = parseInt(click.target.parentElement.parentElement.id);

  taskArray.forEach((element) => {
    if (element.rowID === getrowID) {
      element.isCompleted = true;
    }
  });

  completed++;
  addCompleted(click);
  completedBox.innerText = completed;
}

function check_all_task_completed() {
  /*Function to check if all tasks is completed or deleted
  -change to "all task completed" image when all tasks is ticked
 -change to "src/image/no-task.PNG" image when no tasks is ticked but deleted
  */

  if (document.querySelectorAll(".tick").length === 0 && completed > 0) {
    no_task_image.setAttribute("src", "src/image/alltaskcompleted.PNG");
    heading.style.display = "none";
    no_task.style.display = "block";
    notaskmessage.innerText =
      "Congratulations! You have completed all your tasks";
  } else if (
    document.querySelectorAll(".tick").length === 0 &&
    completed === 0
  ) {
    no_task_image.setAttribute("src", "src/image/no-task.PNG");
    heading.style.display = "none";
    no_task.style.display = "block";
  }
}
var btn = document.getElementById("myBtn"); // button for modal

// *********************Section for modal button ****************************************
// Get value of modal inputs
let saveButton = document.getElementById("save");
saveButton.addEventListener("click", addrow);
let getTaskValue = document.getElementById("getTask");
let getDescriptionValue = document.getElementById("getDescription");
getTaskValue.addEventListener("keyup", check);
getTaskValue.addEventListener("keypress", addrow);
let no_task = document.getElementById("no-task");

// Modal close button hide modal
span.onclick = function () {
  // close button
  modal.style.display = "none";
};

// Show modal and focus on input
addtaskButton.onclick = function () {
  modal.style.display = "block";
  getTaskValue.focus();
};

// *********************Section for modal button ****************************************

function check() {
  //check if input is blank
  if (getTaskValue.value.length === 0) {
    saveButton.style.color = "rgba(0, 0, 0, 0.2)";
    saveButton.disabled = true;
  } else {
    saveButton.style.color = "rgba(60, 60, 60,0.8)";
    saveButton.style.fontWeight = "bold";
    saveButton.disabled = false;
  }
}
let completedListSection = document.getElementById("completedListSection");
function addCompleted(click) {
  let completedList = document.getElementById("Completed_list");
  let newCompletedDiv = document.createElement("div");
  let newCompletedRow = completedList.appendChild(newCompletedDiv);
  let newDiv = document.createElement("div");
  let newDesDiv = document.createElement("div");
  newCompletedRow.append(newDiv, newDesDiv);
  newCompletedRow.classList.add("flexcenter");
  let rowIndex = parseInt(click.target.parentElement.parentElement.id);

  let getTaskValue = taskArray[rowIndex].taskName;
  let getTaskDesc = taskArray[rowIndex].description;
  let completedtaskText = document.createTextNode(getTaskValue);
  let completedtaskDes = document.createTextNode(getTaskDesc);
  newDiv.appendChild(completedtaskText);
  newDesDiv.appendChild(completedtaskDes);
  document.getElementById("completedSection").style.display = "block";
}
let dropDown = document.getElementById("dropDown");
let isExpanded = false;
let dropDownFunc = () => {
  if (isExpanded === false) {
    completedListSection.style.visibility = "visible";
    completedListSection.style.opacity = "1";
    dropDown.setAttribute("src", "src/image/up-arrow.PNG");
    isExpanded = true;
  } else if (isExpanded === true) {
    completedListSection.style.visibility = "hidden";
    completedListSection.style.opacity = "0";
    dropDown.setAttribute("src", "src/image/down-arrow.PNG");
    isExpanded = false;
  }
};

dropDown.addEventListener("click", dropDownFunc);
