let inp = document.querySelector(".form-control");
let form = document.querySelector(".form");
let ulList = document.querySelector(".list");
let todos = JSON.parse(localStorage.getItem("todos")) || [];
let editIndex = null;
const night = document.querySelector("#night"),
  light = document.querySelector("#light");

render();
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (editIndex !== null) {
    updateTodo();
  } else {
    addTodo();
  }
  e.target.reset();
});

function addTodo() {
  const task = inp.value.trim();
  if (task) {
    todos.push(task);
    inp.value = "";
    saveToLocalStorage();
    render();
  }
}

function editTodo(index) {
  inp.value = todos[index];
  editIndex = index;
}

function updateTodo() {
  const updatedTask = inp.value.trim();
  if (updatedTask) {
    todos[editIndex] = updatedTask;
    inp.value = "";
    editIndex = null;
    saveToLocalStorage();
    render();
  }
}

function removeTodo(index) {
  todos.splice(index, 1);
  saveToLocalStorage();
  render();
}

function saveToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function render() {
  ulList.innerHTML = "";
  todos.forEach((task, index) => {
    const listItem = document.createElement("li");
    listItem.id = `todo-${index}`;
    listItem.innerHTML = `
      <li class="d-flex justify-content-between p-2 border border-primary border-2 rounded-2 align-items-center">
        <div class="info d-flex gap-3 align-items-center">
          <h4>${index + 1}</h4>
          <h2>${task}</h2>
        </div>
        <div class="icon">
          <button class="edit btn" onclick="editTodo(${index})">
            <lord-icon
                src="https://cdn.lordicon.com/exymduqj.json"
                trigger="hover"
                colors="primary:#4030e8,secondary:#4030e8"
                style="width:35px;height:35px">
            </lord-icon>
          </button>
          <button class="remove btn" onclick="removeTodo(${index})">
            <lord-icon
                src="https://cdn.lordicon.com/hwjcdycb.json"
                trigger="hover"
                colors="primary:#66ee78,secondary:#66ee78"
                style="width:35px;height:35px">
            </lord-icon>
          </button>
        </div>
      </li>
    `;
    ulList.appendChild(listItem);
  });
}

function applyTheme(mode) {
  if (mode === "night") {
    light.style.display = "block";
    night.style.display = "none";
    document.querySelector("body").style.background = "#212121";
    document.querySelector("body").style.color = "white";
  } else {
    night.style.display = "block";
    light.style.display = "none";
    document.querySelector("body").style.background = "#fff";
    document.querySelector("body").style.color = "black";
  }
}

night.addEventListener("click", () => {
  localStorage.setItem("theme", "night");
  applyTheme("night");
});

light.addEventListener("click", () => {
  localStorage.setItem("theme", "light");
  applyTheme("light");
});

const savedTheme = localStorage.getItem("theme") || "light";
applyTheme(savedTheme);