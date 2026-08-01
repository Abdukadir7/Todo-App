const taskContainer = document.getElementById("taskContainer");
const addBtn = document.getElementById("addBtn");

const inputGroup = document.getElementById("inputGroup");
const cancelBtn = document.getElementById("cancelBtn");
const taskTitle = document.getElementById("taskTitle");
const taskDesc = document.getElementById("taskDesc");
const saveBtn = document.getElementById("saveBtn");

let tasks = [];
let editId = null;

addBtn.addEventListener("click", () => {
  inputGroup.classList.remove("hidden");
});

cancelBtn.addEventListener("click", () => {
  inputGroup.classList.add("hidden");
});

saveBtn.addEventListener("click", () => {
  if (editId !== null) {
    const task = tasks.find((task) => task.id == editId);

    task.title = taskTitle.value;
    task.desc = taskDesc.value;

    editId = null;
  } else {
    const task = {
      id: Date.now(),
      title: taskTitle.value,
      desc: taskDesc.value,
    };

    tasks.push(task);
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));

  renderTasks();

  inputGroup.classList.add("hidden");

  taskTitle.value = "";
  taskDesc.value = "";
});

if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  renderTasks();
}

//render function
function renderTasks() {
  taskContainer.innerHTML = "";

  tasks.forEach((task) => {
    taskContainer.insertAdjacentHTML(
      "beforeend",
      `
      <div class="tasks">
        <div class="head">
          <input type="checkbox">

          <div class="titles">
            <p class="title">${task.title}</p>
            <p class="sub-title">${task.desc}</p>
          </div>
        </div>

        <div class="btns">
          <button type="button" class="delete-btn" data-id="${task.id}">
            <i class="fa-solid fa-trash-can"></i>
          </button>
          <button type="button" class="edit-btn" data-id="${task.id}">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
        </div>
      </div>
      `,
    );
  });
}

taskContainer.addEventListener("click", (e) => {
  if (e.target.closest(".edit-btn")) {
    const id = e.target.closest(".edit-btn").dataset.id;

    console.log("Clicked id:", id);
    console.log("Tasks:", tasks);

    const task = tasks.find((task) => task.id == id);

    console.log("Found task:", task);

    taskTitle.value = task.title;
    taskDesc.value = task.desc;

    editId = id;

    inputGroup.classList.remove("hidden");
  }
  // Delete
  const deleteBtn = e.target.closest(".delete-btn");

  if (deleteBtn) {
    const id = Number(deleteBtn.dataset.id);

    tasks = tasks.filter((task) => task.id !== id);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    renderTasks();
  }
});
