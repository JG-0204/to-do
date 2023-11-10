import Todo from './Modules/Todo';

const createTaskButton = document.querySelector('.btn-create-task');
const createTaskDialog = document.querySelector('.create-task-modal');

const createTaskForm = document.querySelector('#create-task');
// form inputs
const formTaskTitle = createTaskForm[0];
const formTaskDescription = createTaskForm[1];
const formTaskDueDate = createTaskForm[3];

const formAddButton = document.querySelector('.btn-add-task');
const editTaskButton = document.querySelector('.btn-save-changes');

const sampleProject = [];

const taskContainer = document.querySelector('.tasks-list');

createTaskButton.addEventListener('click', (e) => {
  e.preventDefault();
  // get input value and assign it to form input title
  let inputValue = createTaskButton.parentElement[0].value;

  if (inputValue === '') {
    alert('Enter a Task Title');
    return;
  }

  formTaskTitle.value = inputValue;
  createTaskButton.parentElement[0].value = '';

  createTaskDialog.showModal();
});

formAddButton.addEventListener('click', (e) => {
  e.preventDefault();
  const todo = createTodo();
  todo.add(sampleProject);

  renderTodos(sampleProject);

  createTaskDialog.close();
  createTaskForm.reset();
});

createTaskForm.addEventListener('submit', (e) => {
  e.preventDefault();
});

function createTodo() {
  const taskTitle = formTaskTitle.value;
  const taskDescription = formTaskDescription.value;
  const taskDueDate = formTaskDueDate.value ?? 'None';
  const taskPriority = getTaskPriority() ?? 'None';

  // create a todo object and add it to a project/list
  const todo = new Todo(taskTitle, taskDescription, taskDueDate, taskPriority);
  return todo;
}

function getTaskPriority() {
  const priorities = document.querySelectorAll('input[name="priority"]');

  let taskPriority;

  for (const priority of priorities) {
    if (priority.checked) {
      taskPriority = priority.value;
      break;
    }
  }
  return taskPriority;
}

// display todo from project/list array
export function renderTodos() {
  const fragment = new DocumentFragment();
  taskContainer.innerHTML = '';
  sampleProject.forEach((todo) => {
    fragment.appendChild(createTodoCard(todo));
  });

  taskContainer.appendChild(fragment);
}

// create card for todo object to display
function createTodoCard(task) {
  const todo = createDiv('task');

  const topDiv = createDiv('top');
  const todoCheckBox = document.createElement('input');
  todoCheckBox.type = 'checkbox';
  const taskTitleHeading = createHeading('h3', task.title, 'task-title');
  const buttonContainer = createDiv('task-btn-container');
  buttonContainer.append(
    createShowDetailsBtn(task),
    createEditTaskBtn(task),
    createRemoveTaskBtn(task, todo),
  );

  topDiv.append(todoCheckBox, taskTitleHeading, buttonContainer);

  const bottomDiv = createDiv('bottom');
  const taskProjectHeading = createHeading('h5', 'Sample', '');
  const taskDueDateHeading = createHeading('h5', task.dueDate, '');
  const taskPriorityHeading = createHeading('h5', task.priority, '');

  bottomDiv.append(taskProjectHeading, taskDueDateHeading, taskPriorityHeading);

  todo.append(topDiv, bottomDiv);

  return todo;
}

function createDiv(divClass) {
  const div = document.createElement('div');
  div.classList.add(divClass);

  return div;
}

function createHeading(headingType, headingTextContent, headingClass) {
  const heading = document.createElement(headingType);
  heading.textContent = headingTextContent;

  // add class if headingClass has value
  if (!headingClass === '') heading.classList.add(headingClass);

  return heading;
}

function createRemoveTaskBtn(todoObject, todoCard) {
  const button = document.createElement('button');
  button.textContent = 'Remove';
  button.addEventListener('click', () => {
    if (confirm('Delete this todo?')) {
      todoObject.delete(sampleProject);
      taskContainer.removeChild(todoCard);
    }
  });

  return button;
}

// edit task button
function createEditTaskBtn(todoObject) {
  let isClicked = false;
  const button = document.createElement('button');
  button.textContent = 'Edit';
  button.addEventListener('click', () => {
    isClicked = true;

    console.log(todoObject);
    createTaskDialog.showModal();
    editTaskButton.classList.remove('hidden');
    formAddButton.classList.add('hidden');
    formTaskTitle.value = todoObject.title;
    formTaskDescription.value = todoObject.description;
    formTaskDueDate.value = todoObject.dueDate;
    setTaskPriority(todoObject);
  });

  editTaskButton.addEventListener(
    'click',
    (e) => {
      e.preventDefault();
      if (!isClicked) return;

      editTodo(todoObject);

      editTaskButton.classList.add('hidden');
      formAddButton.classList.remove('hidden');

      createTaskDialog.close();
      createTaskForm.reset();
    },
    { once: true },
  );

  return button;
}

function setTaskPriority(todo) {
  const priorities = document.querySelectorAll('input[name="priority"]');

  for (const priority of priorities) {
    if (priority.value === todo.priority) {
      priority.checked = true;
      break;
    }
  }
}

function editTodo(todo) {
  todo.edit(
    formTaskTitle.value,
    formTaskDescription.value,
    formTaskDueDate.value,
    getTaskPriority(),
  );
  console.log(sampleProject);
}

function createShowDetailsBtn(todo) {
  const detailsModal = createDetailsModal(todo);
  document.body.appendChild(detailsModal);
  const button = document.createElement('button');
  button.textContent = 'Details';
  button.addEventListener('click', () => {
    detailsModal.showModal();
  });

  return button;
}

function createDetailsModal(todo) {
  const dialog = document.createElement('dialog');
  dialog.classList.add('details-modal');

  const title = createHeading('h3', todo.title, '');
  const description = createHeading('h3', todo.description, '');
  const project = createHeading('h3', 'Sample', '');
  const dueDate = createHeading('h3', todo.dueDate, '');
  const priority = createHeading('h3', todo.priority, '');

  const closeButton = document.createElement('button');
  closeButton.textContent = 'exit';
  closeButton.addEventListener('click', () => {
    dialog.close();
  });

  dialog.append(title, description, project, dueDate, priority, closeButton);

  return dialog;
}
