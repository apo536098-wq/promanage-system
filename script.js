const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const themeToggle = document.getElementById('themeToggle');
const compCount = document.getElementById('compCount');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let isDark = localStorage.getItem('theme') === 'dark';

// Başlangıç Teması
if (isDark) document.body.setAttribute('data-theme', 'dark');

function updateUI() {
    taskList.innerHTML = '';
    tasks.forEach((task, i) => {
        const item = document.createElement('div');
        item.className = `task-item ${task.completed ? 'completed' : ''}`;
        item.innerHTML = `
            <span>${task.text}</span>
            <div class="btn-group">
                <button onclick="toggle(${i})"><i class="fas fa-check"></i></button>
                <button onclick="remove(${i})"><i class="fas fa-trash"></i></button>
            </div>
        `;
        taskList.appendChild(item);
    });
    compCount.innerText = tasks.filter(t => t.completed).length;
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

addBtn.onclick = () => {
    if (taskInput.value.trim()) {
        tasks.push({ text: taskInput.value, completed: false });
        taskInput.value = '';
        updateUI();
    }
};

window.toggle = (i) => { tasks[i].completed = !tasks[i].completed; updateUI(); };
window.remove = (i) => { tasks.splice(i, 1); updateUI(); };

themeToggle.onclick = () => {
    isDark = !isDark;
    document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
};

updateUI();