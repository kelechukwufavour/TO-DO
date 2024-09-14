let todos = []; // Array to hold todo objects

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
});

// Function to render todos
function renderTodos(filteredTodos = todos) {
  todoList.innerHTML = '';
  filteredTodos.forEach(todo => {
    const li = document.createElement('li');
    li.textContent = todo.text;
    li.classList.toggle('completed', todo.completed);
    li.addEventListener('click', () => toggleComplete(todo.id));

    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTodo(todo.id));
    li.appendChild(deleteButton);
    
    todoList.appendChild(li);
  });
}

// Add new todo
addTodoButton.addEventListener('click', () => {
  const todoText = newTodoInput.value.trim();
  if (todoText === '') return;
  
  const newTodo = { id: Date.now(), text: todoText, completed: false };
  todos.push(newTodo);
  newTodoInput.value = ''; // Clear input
  renderTodos();
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

// Filter by all, active, completed
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    document.querySelector('.filter.active').classList.remove('active');
    button.classList.add('active');
    const filter = button.id;

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