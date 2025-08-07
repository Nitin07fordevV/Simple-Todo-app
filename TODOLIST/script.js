document.addEventListener("DOMContentLoaded", () => {
  const input_box = document.getElementById('name');
  const addTasksBtn = document.getElementById('submit');
  const todo_container = document.getElementById('todo-container');

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Render all tasks on page load
  renderTasks();

  addTasksBtn.addEventListener('click', () => {
    let input_text = input_box.value.trim();
    if (input_text === "") return;

    addTask(input_text);
    saveTasks();
    renderTasks();

    input_box.value = "";
  });

  function addTask(text) {
    tasks.push({ text, completed: false });
  }

  function renderTasks() {
    todo_container.innerHTML = ''; // Clear existing list

    tasks.forEach((task, index) => {
      const li = document.createElement('li');
      const checkbox = document.createElement('input');
      const span = document.createElement('span');
      const deleteBtn = document.createElement('button');

      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;

      span.textContent = task.text;
      if (task.completed) {
        span.classList.add('line-through', 'text-gray-400');
      }

      deleteBtn.textContent = 'Delete';
      

      checkbox.addEventListener('change', () => {
        tasks[index].completed = checkbox.checked;
        saveTasks();
        renderTasks();
      });

      deleteBtn.addEventListener('click', () => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
      });

      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(deleteBtn);
      todo_container.appendChild(li);
    });
  }

  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
});
