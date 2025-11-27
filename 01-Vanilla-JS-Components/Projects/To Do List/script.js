const taskList = document.getElementById("task-list");
const input = document.getElementById("taskInput");
const addBtn = document.getElementById("add-btn");

let clickTimer;

function addTask() {
    const taskText = input.value.trim();
    if (taskText === "") return;

    // Save task to localStorage (unique key)
    const id = Date.now(); // safer unique key
    localStorage.setItem(id, JSON.stringify({ text: taskText, completed: false }));

    input.value = "";
    updateTaskList();
}

function updateTaskList() {
    taskList.innerHTML = ""; // Clear before re-render
    if (localStorage.length > 0) {

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = JSON.parse(localStorage.getItem(key));

            const li = document.createElement("li");
            if (value.completed) li.className = "completed";
            li.innerHTML = `<span class="task-text" data-lsKey="${key}">${value.text}</span>`;

            // remove button
            const btn = document.createElement("button");
            btn.className = "remove-btn";
            btn.textContent = "X";

            li.appendChild(btn);
            taskList.appendChild(li);
        }
    }
    else {
        taskList.textContent = "Empty :)"
    }
}


// toggle complete
taskList.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        clickTimer = setTimeout(() => {
            const currKey = e.target.previousElementSibling.dataset.lskey;
            const currValue = JSON.parse(localStorage.getItem(currKey)); // parse string in json

            currValue.completed = !currValue.completed;
            localStorage.setItem(currKey, JSON.stringify(currValue)); // set the changed object
            e.target.parentElement.classList.toggle('completed');
        }, 200); // wait to see if it's a double-click
    }
});


// remove tasks
taskList.addEventListener('dblclick', (e) => {
    clearTimeout(clickTimer);
    if (e.target.tagName === 'BUTTON') {
        const currKey = e.target.previousElementSibling.dataset.lskey;

        e.target.parentElement.remove();
        localStorage.removeItem(currKey);

        updateTaskList();
    }
});


// Load all saved tasks
window.addEventListener("load", updateTaskList);

// Add a new task on button
addBtn.addEventListener("click", addTask);

// Add a new task on enter
input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
});