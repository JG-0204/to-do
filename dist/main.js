/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Modules/Todo.js":
/*!*****************************!*\
  !*** ./src/Modules/Todo.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Todo)
/* harmony export */ });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index */ "./src/index.js");


class Todo {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }

  add(list) {
    list.push(this);

    (0,_index__WEBPACK_IMPORTED_MODULE_0__.renderTodos)();
  }

  delete(list) {
    list.splice(list.indexOf(this), 1);

    (0,_index__WEBPACK_IMPORTED_MODULE_0__.renderTodos)();
  }

  move(currentList, newList) {
    this.delete(currentList, this);
    this.add(this, newList);
  }

  edit(newTitle, newDescription, newDueDate, newPriority) {
    this.title = newTitle;
    this.description = newDescription;
    this.dueDate = newDueDate;
    this.priority = newPriority;

    (0,_index__WEBPACK_IMPORTED_MODULE_0__.renderTodos)();
  }
}


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderTodos: () => (/* binding */ renderTodos)
/* harmony export */ });
/* harmony import */ var _Modules_Todo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Modules/Todo */ "./src/Modules/Todo.js");


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
  const todo = createTodo();
  todo.add(sampleProject);

  // renderTodos(sampleProject);

  createTaskDialog.close();
  createTaskForm.reset();
});

function createTodo() {
  const taskTitle = formTaskTitle.value;
  const taskDescription = formTaskDescription.value;
  const taskDueDate = formTaskDueDate.value ?? 'None';
  const taskPriority = getTaskPriority() ?? 'None';

  // create a todo object and add it to a project/list
  const todo = new _Modules_Todo__WEBPACK_IMPORTED_MODULE_0__["default"](taskTitle, taskDescription, taskDueDate, taskPriority);
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
function renderTodos() {
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
    () => {
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


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBdUM7O0FBRXhCO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsSUFBSSxtREFBVztBQUNmOztBQUVBO0FBQ0E7O0FBRUEsSUFBSSxtREFBVztBQUNmOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsSUFBSSxtREFBVztBQUNmO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuQ2tDOztBQUVsQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLHFEQUFJO0FBQ3ZCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMLE1BQU0sWUFBWTtBQUNsQjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBOzs7Ozs7O1VDaFBBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG8tZG8vLi9zcmMvTW9kdWxlcy9Ub2RvLmpzIiwid2VicGFjazovL3RvLWRvLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3RvLWRvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvLWRvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvLWRvL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG8tZG8vd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly90by1kby93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vdG8tZG8vd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlbmRlclRvZG9zIH0gZnJvbSAnLi4vaW5kZXgnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUb2RvIHtcbiAgY29uc3RydWN0b3IodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSkge1xuICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgdGhpcy5kdWVEYXRlID0gZHVlRGF0ZTtcbiAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XG4gIH1cblxuICBhZGQobGlzdCkge1xuICAgIGxpc3QucHVzaCh0aGlzKTtcblxuICAgIHJlbmRlclRvZG9zKCk7XG4gIH1cblxuICBkZWxldGUobGlzdCkge1xuICAgIGxpc3Quc3BsaWNlKGxpc3QuaW5kZXhPZih0aGlzKSwgMSk7XG5cbiAgICByZW5kZXJUb2RvcygpO1xuICB9XG5cbiAgbW92ZShjdXJyZW50TGlzdCwgbmV3TGlzdCkge1xuICAgIHRoaXMuZGVsZXRlKGN1cnJlbnRMaXN0LCB0aGlzKTtcbiAgICB0aGlzLmFkZCh0aGlzLCBuZXdMaXN0KTtcbiAgfVxuXG4gIGVkaXQobmV3VGl0bGUsIG5ld0Rlc2NyaXB0aW9uLCBuZXdEdWVEYXRlLCBuZXdQcmlvcml0eSkge1xuICAgIHRoaXMudGl0bGUgPSBuZXdUaXRsZTtcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gbmV3RGVzY3JpcHRpb247XG4gICAgdGhpcy5kdWVEYXRlID0gbmV3RHVlRGF0ZTtcbiAgICB0aGlzLnByaW9yaXR5ID0gbmV3UHJpb3JpdHk7XG5cbiAgICByZW5kZXJUb2RvcygpO1xuICB9XG59XG4iLCJpbXBvcnQgVG9kbyBmcm9tICcuL01vZHVsZXMvVG9kbyc7XG5cbmNvbnN0IGNyZWF0ZVRhc2tCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuLWNyZWF0ZS10YXNrJyk7XG5jb25zdCBjcmVhdGVUYXNrRGlhbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNyZWF0ZS10YXNrLW1vZGFsJyk7XG5cbmNvbnN0IGNyZWF0ZVRhc2tGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NyZWF0ZS10YXNrJyk7XG4vLyBmb3JtIGlucHV0c1xuY29uc3QgZm9ybVRhc2tUaXRsZSA9IGNyZWF0ZVRhc2tGb3JtWzBdO1xuY29uc3QgZm9ybVRhc2tEZXNjcmlwdGlvbiA9IGNyZWF0ZVRhc2tGb3JtWzFdO1xuY29uc3QgZm9ybVRhc2tEdWVEYXRlID0gY3JlYXRlVGFza0Zvcm1bM107XG5cbmNvbnN0IGZvcm1BZGRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuLWFkZC10YXNrJyk7XG5jb25zdCBlZGl0VGFza0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG4tc2F2ZS1jaGFuZ2VzJyk7XG5cbmNvbnN0IHNhbXBsZVByb2plY3QgPSBbXTtcblxuY29uc3QgdGFza0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrcy1saXN0Jyk7XG5cbmNyZWF0ZVRhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIC8vIGdldCBpbnB1dCB2YWx1ZSBhbmQgYXNzaWduIGl0IHRvIGZvcm0gaW5wdXQgdGl0bGVcbiAgbGV0IGlucHV0VmFsdWUgPSBjcmVhdGVUYXNrQnV0dG9uLnBhcmVudEVsZW1lbnRbMF0udmFsdWU7XG5cbiAgaWYgKGlucHV0VmFsdWUgPT09ICcnKSB7XG4gICAgYWxlcnQoJ0VudGVyIGEgVGFzayBUaXRsZScpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGZvcm1UYXNrVGl0bGUudmFsdWUgPSBpbnB1dFZhbHVlO1xuICBjcmVhdGVUYXNrQnV0dG9uLnBhcmVudEVsZW1lbnRbMF0udmFsdWUgPSAnJztcblxuICBjcmVhdGVUYXNrRGlhbG9nLnNob3dNb2RhbCgpO1xufSk7XG5cbmZvcm1BZGRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGNvbnN0IHRvZG8gPSBjcmVhdGVUb2RvKCk7XG4gIHRvZG8uYWRkKHNhbXBsZVByb2plY3QpO1xuXG4gIHJlbmRlclRvZG9zKHNhbXBsZVByb2plY3QpO1xuXG4gIGNyZWF0ZVRhc2tEaWFsb2cuY2xvc2UoKTtcbiAgY3JlYXRlVGFza0Zvcm0ucmVzZXQoKTtcbn0pO1xuXG5jcmVhdGVUYXNrRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGNvbnN0IHRvZG8gPSBjcmVhdGVUb2RvKCk7XG4gIHRvZG8uYWRkKHNhbXBsZVByb2plY3QpO1xuXG4gIC8vIHJlbmRlclRvZG9zKHNhbXBsZVByb2plY3QpO1xuXG4gIGNyZWF0ZVRhc2tEaWFsb2cuY2xvc2UoKTtcbiAgY3JlYXRlVGFza0Zvcm0ucmVzZXQoKTtcbn0pO1xuXG5mdW5jdGlvbiBjcmVhdGVUb2RvKCkge1xuICBjb25zdCB0YXNrVGl0bGUgPSBmb3JtVGFza1RpdGxlLnZhbHVlO1xuICBjb25zdCB0YXNrRGVzY3JpcHRpb24gPSBmb3JtVGFza0Rlc2NyaXB0aW9uLnZhbHVlO1xuICBjb25zdCB0YXNrRHVlRGF0ZSA9IGZvcm1UYXNrRHVlRGF0ZS52YWx1ZSA/PyAnTm9uZSc7XG4gIGNvbnN0IHRhc2tQcmlvcml0eSA9IGdldFRhc2tQcmlvcml0eSgpID8/ICdOb25lJztcblxuICAvLyBjcmVhdGUgYSB0b2RvIG9iamVjdCBhbmQgYWRkIGl0IHRvIGEgcHJvamVjdC9saXN0XG4gIGNvbnN0IHRvZG8gPSBuZXcgVG9kbyh0YXNrVGl0bGUsIHRhc2tEZXNjcmlwdGlvbiwgdGFza0R1ZURhdGUsIHRhc2tQcmlvcml0eSk7XG4gIHJldHVybiB0b2RvO1xufVxuXG5mdW5jdGlvbiBnZXRUYXNrUHJpb3JpdHkoKSB7XG4gIGNvbnN0IHByaW9yaXRpZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFtuYW1lPVwicHJpb3JpdHlcIl0nKTtcblxuICBsZXQgdGFza1ByaW9yaXR5O1xuXG4gIGZvciAoY29uc3QgcHJpb3JpdHkgb2YgcHJpb3JpdGllcykge1xuICAgIGlmIChwcmlvcml0eS5jaGVja2VkKSB7XG4gICAgICB0YXNrUHJpb3JpdHkgPSBwcmlvcml0eS52YWx1ZTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGFza1ByaW9yaXR5O1xufVxuXG4vLyBkaXNwbGF5IHRvZG8gZnJvbSBwcm9qZWN0L2xpc3QgYXJyYXlcbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJUb2RvcygpIHtcbiAgY29uc3QgZnJhZ21lbnQgPSBuZXcgRG9jdW1lbnRGcmFnbWVudCgpO1xuICB0YXNrQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICBzYW1wbGVQcm9qZWN0LmZvckVhY2goKHRvZG8pID0+IHtcbiAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChjcmVhdGVUb2RvQ2FyZCh0b2RvKSk7XG4gIH0pO1xuXG4gIHRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xufVxuXG4vLyBjcmVhdGUgY2FyZCBmb3IgdG9kbyBvYmplY3QgdG8gZGlzcGxheVxuZnVuY3Rpb24gY3JlYXRlVG9kb0NhcmQodGFzaykge1xuICBjb25zdCB0b2RvID0gY3JlYXRlRGl2KCd0YXNrJyk7XG5cbiAgY29uc3QgdG9wRGl2ID0gY3JlYXRlRGl2KCd0b3AnKTtcbiAgY29uc3QgdG9kb0NoZWNrQm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgdG9kb0NoZWNrQm94LnR5cGUgPSAnY2hlY2tib3gnO1xuICBjb25zdCB0YXNrVGl0bGVIZWFkaW5nID0gY3JlYXRlSGVhZGluZygnaDMnLCB0YXNrLnRpdGxlLCAndGFzay10aXRsZScpO1xuICBjb25zdCBidXR0b25Db250YWluZXIgPSBjcmVhdGVEaXYoJ3Rhc2stYnRuLWNvbnRhaW5lcicpO1xuICBidXR0b25Db250YWluZXIuYXBwZW5kKFxuICAgIGNyZWF0ZVNob3dEZXRhaWxzQnRuKHRhc2spLFxuICAgIGNyZWF0ZUVkaXRUYXNrQnRuKHRhc2spLFxuICAgIGNyZWF0ZVJlbW92ZVRhc2tCdG4odGFzaywgdG9kbyksXG4gICk7XG5cbiAgdG9wRGl2LmFwcGVuZCh0b2RvQ2hlY2tCb3gsIHRhc2tUaXRsZUhlYWRpbmcsIGJ1dHRvbkNvbnRhaW5lcik7XG5cbiAgY29uc3QgYm90dG9tRGl2ID0gY3JlYXRlRGl2KCdib3R0b20nKTtcbiAgY29uc3QgdGFza1Byb2plY3RIZWFkaW5nID0gY3JlYXRlSGVhZGluZygnaDUnLCAnU2FtcGxlJywgJycpO1xuICBjb25zdCB0YXNrRHVlRGF0ZUhlYWRpbmcgPSBjcmVhdGVIZWFkaW5nKCdoNScsIHRhc2suZHVlRGF0ZSwgJycpO1xuICBjb25zdCB0YXNrUHJpb3JpdHlIZWFkaW5nID0gY3JlYXRlSGVhZGluZygnaDUnLCB0YXNrLnByaW9yaXR5LCAnJyk7XG5cbiAgYm90dG9tRGl2LmFwcGVuZCh0YXNrUHJvamVjdEhlYWRpbmcsIHRhc2tEdWVEYXRlSGVhZGluZywgdGFza1ByaW9yaXR5SGVhZGluZyk7XG5cbiAgdG9kby5hcHBlbmQodG9wRGl2LCBib3R0b21EaXYpO1xuXG4gIHJldHVybiB0b2RvO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVEaXYoZGl2Q2xhc3MpIHtcbiAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGRpdi5jbGFzc0xpc3QuYWRkKGRpdkNsYXNzKTtcblxuICByZXR1cm4gZGl2O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVIZWFkaW5nKGhlYWRpbmdUeXBlLCBoZWFkaW5nVGV4dENvbnRlbnQsIGhlYWRpbmdDbGFzcykge1xuICBjb25zdCBoZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChoZWFkaW5nVHlwZSk7XG4gIGhlYWRpbmcudGV4dENvbnRlbnQgPSBoZWFkaW5nVGV4dENvbnRlbnQ7XG5cbiAgLy8gYWRkIGNsYXNzIGlmIGhlYWRpbmdDbGFzcyBoYXMgdmFsdWVcbiAgaWYgKCFoZWFkaW5nQ2xhc3MgPT09ICcnKSBoZWFkaW5nLmNsYXNzTGlzdC5hZGQoaGVhZGluZ0NsYXNzKTtcblxuICByZXR1cm4gaGVhZGluZztcbn1cblxuZnVuY3Rpb24gY3JlYXRlUmVtb3ZlVGFza0J0bih0b2RvT2JqZWN0LCB0b2RvQ2FyZCkge1xuICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgYnV0dG9uLnRleHRDb250ZW50ID0gJ1JlbW92ZSc7XG4gIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBpZiAoY29uZmlybSgnRGVsZXRlIHRoaXMgdG9kbz8nKSkge1xuICAgICAgdG9kb09iamVjdC5kZWxldGUoc2FtcGxlUHJvamVjdCk7XG4gICAgICB0YXNrQ29udGFpbmVyLnJlbW92ZUNoaWxkKHRvZG9DYXJkKTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBidXR0b247XG59XG5cbi8vIGVkaXQgdGFzayBidXR0b25cbmZ1bmN0aW9uIGNyZWF0ZUVkaXRUYXNrQnRuKHRvZG9PYmplY3QpIHtcbiAgbGV0IGlzQ2xpY2tlZCA9IGZhbHNlO1xuICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgYnV0dG9uLnRleHRDb250ZW50ID0gJ0VkaXQnO1xuICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgaXNDbGlja2VkID0gdHJ1ZTtcblxuICAgIGNvbnNvbGUubG9nKHRvZG9PYmplY3QpO1xuICAgIGNyZWF0ZVRhc2tEaWFsb2cuc2hvd01vZGFsKCk7XG4gICAgZWRpdFRhc2tCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgZm9ybUFkZEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICBmb3JtVGFza1RpdGxlLnZhbHVlID0gdG9kb09iamVjdC50aXRsZTtcbiAgICBmb3JtVGFza0Rlc2NyaXB0aW9uLnZhbHVlID0gdG9kb09iamVjdC5kZXNjcmlwdGlvbjtcbiAgICBmb3JtVGFza0R1ZURhdGUudmFsdWUgPSB0b2RvT2JqZWN0LmR1ZURhdGU7XG4gICAgc2V0VGFza1ByaW9yaXR5KHRvZG9PYmplY3QpO1xuICB9KTtcblxuICBlZGl0VGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFxuICAgICdjbGljaycsXG4gICAgKCkgPT4ge1xuICAgICAgaWYgKCFpc0NsaWNrZWQpIHJldHVybjtcblxuICAgICAgZWRpdFRvZG8odG9kb09iamVjdCk7XG5cbiAgICAgIGVkaXRUYXNrQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgZm9ybUFkZEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcblxuICAgICAgY3JlYXRlVGFza0RpYWxvZy5jbG9zZSgpO1xuICAgICAgY3JlYXRlVGFza0Zvcm0ucmVzZXQoKTtcbiAgICB9LFxuICAgIHsgb25jZTogdHJ1ZSB9LFxuICApO1xuXG4gIHJldHVybiBidXR0b247XG59XG5cbmZ1bmN0aW9uIHNldFRhc2tQcmlvcml0eSh0b2RvKSB7XG4gIGNvbnN0IHByaW9yaXRpZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFtuYW1lPVwicHJpb3JpdHlcIl0nKTtcblxuICBmb3IgKGNvbnN0IHByaW9yaXR5IG9mIHByaW9yaXRpZXMpIHtcbiAgICBpZiAocHJpb3JpdHkudmFsdWUgPT09IHRvZG8ucHJpb3JpdHkpIHtcbiAgICAgIHByaW9yaXR5LmNoZWNrZWQgPSB0cnVlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGVkaXRUb2RvKHRvZG8pIHtcbiAgdG9kby5lZGl0KFxuICAgIGZvcm1UYXNrVGl0bGUudmFsdWUsXG4gICAgZm9ybVRhc2tEZXNjcmlwdGlvbi52YWx1ZSxcbiAgICBmb3JtVGFza0R1ZURhdGUudmFsdWUsXG4gICAgZ2V0VGFza1ByaW9yaXR5KCksXG4gICk7XG4gIGNvbnNvbGUubG9nKHNhbXBsZVByb2plY3QpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVTaG93RGV0YWlsc0J0bih0b2RvKSB7XG4gIGNvbnN0IGRldGFpbHNNb2RhbCA9IGNyZWF0ZURldGFpbHNNb2RhbCh0b2RvKTtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkZXRhaWxzTW9kYWwpO1xuICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgYnV0dG9uLnRleHRDb250ZW50ID0gJ0RldGFpbHMnO1xuICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgZGV0YWlsc01vZGFsLnNob3dNb2RhbCgpO1xuICB9KTtcblxuICByZXR1cm4gYnV0dG9uO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVEZXRhaWxzTW9kYWwodG9kbykge1xuICBjb25zdCBkaWFsb2cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaWFsb2cnKTtcbiAgZGlhbG9nLmNsYXNzTGlzdC5hZGQoJ2RldGFpbHMtbW9kYWwnKTtcblxuICBjb25zdCB0aXRsZSA9IGNyZWF0ZUhlYWRpbmcoJ2gzJywgdG9kby50aXRsZSwgJycpO1xuICBjb25zdCBkZXNjcmlwdGlvbiA9IGNyZWF0ZUhlYWRpbmcoJ2gzJywgdG9kby5kZXNjcmlwdGlvbiwgJycpO1xuICBjb25zdCBwcm9qZWN0ID0gY3JlYXRlSGVhZGluZygnaDMnLCAnU2FtcGxlJywgJycpO1xuICBjb25zdCBkdWVEYXRlID0gY3JlYXRlSGVhZGluZygnaDMnLCB0b2RvLmR1ZURhdGUsICcnKTtcbiAgY29uc3QgcHJpb3JpdHkgPSBjcmVhdGVIZWFkaW5nKCdoMycsIHRvZG8ucHJpb3JpdHksICcnKTtcblxuICBjb25zdCBjbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICBjbG9zZUJ1dHRvbi50ZXh0Q29udGVudCA9ICdleGl0JztcbiAgY2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgZGlhbG9nLmNsb3NlKCk7XG4gIH0pO1xuXG4gIGRpYWxvZy5hcHBlbmQodGl0bGUsIGRlc2NyaXB0aW9uLCBwcm9qZWN0LCBkdWVEYXRlLCBwcmlvcml0eSwgY2xvc2VCdXR0b24pO1xuXG4gIHJldHVybiBkaWFsb2c7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9