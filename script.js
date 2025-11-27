document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText === '') return;

    createTaskElement(taskText, false);
    saveTasks();
    taskInput.value = '';
}

// Create Task Element
function createTaskElement(text, completed) {
    const li = document.createElement('li');

    // Custom checkbox
    const checkbox = document.createElement('div');
    checkbox.className = 'check';
    if (completed) checkbox.classList.add('checked');

    checkbox.onclick = () => {
        checkbox.classList.toggle('checked');
        li.classList.toggle('done');
        saveTasks();
    };

    // Task text
    const span = document.createElement('span');
    span.textContent = text;
    span.className = 'task-text';

    // Delete button
    const deleteBtn = document.createElement('span');
    deleteBtn.textContent = "✕";
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = () => {
        li.remove();
        saveTasks();
    };

    // Append items
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    document.getElementById('taskList').appendChild(li);

    if (completed) li.classList.add('done');
}

// Save to Local Storage
function saveTasks() {
    const tasks = [];

    document.querySelectorAll('#taskList li').forEach(li => {
        tasks.push({
            text: li.querySelector('.task-text').textContent,
            done: li.classList.contains('done')
        });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load Tasks
function loadTasks() {
    const data = JSON.parse(localStorage.getItem('tasks')) || [];
    data.forEach(t => createTaskElement(t.text, t.done));
}

// Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle('dark');
}
