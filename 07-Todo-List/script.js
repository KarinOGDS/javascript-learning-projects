const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");
const clearAllBtn = document.getElementById("clearAllBtn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

displayTasks();

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        return;
    }

    tasks.push({
        text: taskText,
        completed: false
    });

    taskInput.value = "";

    saveTasks();
    displayTasks();
}

function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <input
                type="checkbox"
                id="task-${index}"
                ${task.completed ? "checked" : ""}
            >

            <label for="task-${index}">
                ${task.text}
            </label>

            <button class="delete-btn">
                Delete
            </button>
        `;

        li.querySelector("input")
            .addEventListener("change", () => {
                toggleTask(index);
            });

        li.querySelector(".delete-btn")
            .addEventListener("click", () => {
                deleteTask(index);
            });

        taskList.appendChild(li);
    });
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;

    saveTasks();
    displayTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);

    saveTasks();
    displayTasks();
}
function deleteAllTasks() {
    tasks = [];
    saveTasks();
    displayTasks();
}
function clearCompletedTasks() {
    tasks = tasks.filter(task => !task.completed);

    saveTasks();
    displayTasks();
}

addTaskBtn.addEventListener("click", addTask);

clearCompletedBtn.addEventListener(
    "click",
    clearCompletedTasks
);

clearAllBtn.addEventListener(
    "click",
    deleteAllTasks
);

taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});