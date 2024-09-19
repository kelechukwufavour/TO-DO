document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const bgImage = document.getElementById('hero-bg');

  themeToggle.addEventListener('click', () => {
      body.classList.toggle('light-theme');
      body.classList.toggle('dark-theme');

      if (body.classList.contains('light-theme')) {
          bgImage.src = 'images/bg-desktop-light.jpg'; // Light theme image
          themeToggle.src = 'images/icon-moon.svg'; // Change to moon icon
      } else {
          bgImage.src = 'images/bg-desktop-dark.jpg'; // Dark theme image
          themeToggle.src = 'images/icon-sun.svg'; // Change back to sun icon
      }
  });
});


// Function to save theme preference in localStorage
function saveThemePreference() {
    const isDarkMode = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}

// Function to render todos
function renderTodos(filteredTodos = todos) {
    todoList.innerHTML = '';

    filteredTodos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        if (todo.completed) li.classList.add('completed');

        // Create circular button with number and check icon
        const numberButton = document.createElement('button');
        numberButton.classList.add('todo-number-btn');
        numberButton.innerHTML = `<span>${index + 1}</span><span class="check-icon">✔</span>`;
        numberButton.addEventListener('click', () => toggleComplete(todo.id));

        const todoText = document.createElement('span');
        todoText.classList.add('todo-text');
        todoText.textContent = todo.text;

        li.appendChild(numberButton);
        li.appendChild(todoText);

        // Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', (event) => {
            event.stopPropagation();
            deleteTodo(todo.id);
        });

        li.appendChild(deleteButton);
        todoList.appendChild(li);
    });

    // Save todos to localStorage after rendering
    saveTodos();
}

// Function to add a new todo
function addTodo() {
    const todoText = newTodoInput.value.trim();
    if (todoText === '') return;

    const newTodo = { id: Date.now(), text: todoText, completed: false };
    todos.push(newTodo);
    newTodoInput.value = ''; // Clear input
    renderTodos();
}

// Toggle complete status
function toggleComplete(id) {
    todos = todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    renderTodos();
}

// Delete a todo
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
}

// Filter todos
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        document.querySelector('.filter.active').classList.remove('active');
        button.classList.add('active');
        const filter = button.id.split('-')[1];

        let filteredTodos = todos;
        if (filter === 'active') {
            filteredTodos = todos.filter(todo => !todo.completed);
        } else if (filter === 'completed') {
            filteredTodos = todos.filter(todo => todo.completed);
        }

        renderTodos(filteredTodos);
    });
});

// Clear completed todos
clearCompletedButton.addEventListener('click', () => {
    todos = todos.filter(todo => !todo.completed);
    renderTodos();
});

// Save todos to localStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Load todos from localStorage
function loadTodos() {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
        todos = JSON.parse(savedTodos);
        renderTodos();
    }
}

// Load todos and theme when the page loads
window.addEventListener('load', () => {
    loadTodos();
    loadThemePreference();
});

// Event listeners
themeToggleButton.addEventListener('click', toggleTheme);
document.getElementById('todo-form').addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form submission
    addTodo();
});

// Initialize with the correct theme
document.addEventListener('DOMContentLoaded', loadThemePreference);