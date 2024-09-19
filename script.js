// Array to hold todo objects
let todos = [];

// Get elements
const themeToggleButton = document.getElementById('theme-toggle');
const newTodoInput = document.getElementById('new-todo');
const addTodoButton = document.getElementById('add-todo');
const todoList = document.getElementById('todo-list');
const clearCompletedButton = document.getElementById('clear-completed');
const filterButtons = document.querySelectorAll('.filter');

// Toggle dark/light mode
themeToggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  saveThemePreference();
});

// Function to save theme preference in localStorage
function saveThemePreference() {
  const isDarkMode = document.body.classList.contains('dark-mode');
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}

// Function to load theme preference from localStorage
function loadThemePreference() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
  }
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
    if (todo.completed) numberButton.classList.add('completed');

    // Number display
    numberButton.innerHTML = `<span>${index + 1}</span>`;
    // Check icon inside button
    const checkIcon = document.createElement('span');
    checkIcon.classList.add('check-icon');
    checkIcon.textContent = '✔';
    numberButton.appendChild(checkIcon);

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

// Add todo on button click
addTodoButton.addEventListener('click', addTodo);

// Add todo on 'Enter' key press
newTodoInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addTodo();
  }
});

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

// Filter by all, active, or completed
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    document.querySelector('.filter.active').classList.remove('active');
    button.classList.add('active');
    const filter = button.id;

    let filteredTodos = todos;
    if (filter === 'filter-active') {
      filteredTodos = todos.filter(todo => !todo.completed);
    } else if (filter === 'filter-completed') {
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
