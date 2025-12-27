const form = document.getElementById('taskForm');
const list = document.getElementById('taskList');
const count = document.getElementById('taskCount');

const timeInput = document.getElementById('taskTime');

timeInput.addEventListener('input', () => {
  setTimeout(() => {
    timeInput.blur();
  }, 0);
});

timeInput.addEventListener('change', () => {
  document.activeElement.blur();
});

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function updateCount() {
  count.textContent = tasks.length;
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  list.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = `priority-${task.priority}`;
    if (task.completed) li.classList.add('completed');

    li.innerHTML = `
      <div class="task-details">
        <strong>${task.text}</strong>
        <small>${task.date} | ${task.time}</small>
      </div>
      <div class="actions">
        <button class="complete">✓</button>
        <button class="delete">✕</button>
      </div>
    `;

    li.querySelector('.complete').onclick = () => {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    };

    li.querySelector('.delete').onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    list.appendChild(li);
  });

  updateCount();
}

form.addEventListener('submit', e => {
  e.preventDefault();

  tasks.push({
    text: taskText.value,
    date: taskDate.value,
    time: taskTime.value,
    priority: priority.value,
    completed: false
  });

  saveTasks();
  renderTasks();
  form.reset();
});

renderTasks();
