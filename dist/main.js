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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBdUM7O0FBRXhCO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsSUFBSSxtREFBVztBQUNmOztBQUVBO0FBQ0E7O0FBRUEsSUFBSSxtREFBVztBQUNmOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsSUFBSSxtREFBVztBQUNmO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuQ2tDOztBQUVsQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLHFEQUFJO0FBQ3ZCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsTUFBTSxZQUFZO0FBQ2xCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7Ozs7Ozs7VUMxT0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby8uL3NyYy9Nb2R1bGVzL1RvZG8uanMiLCJ3ZWJwYWNrOi8vdG8tZG8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG8tZG8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG8tZG8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvLWRvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90by1kby93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3RvLWRvL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly90by1kby93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVuZGVyVG9kb3MgfSBmcm9tICcuLi9pbmRleCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvZG8ge1xuICBjb25zdHJ1Y3Rvcih0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5KSB7XG4gICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICB0aGlzLmR1ZURhdGUgPSBkdWVEYXRlO1xuICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgfVxuXG4gIGFkZChsaXN0KSB7XG4gICAgbGlzdC5wdXNoKHRoaXMpO1xuXG4gICAgcmVuZGVyVG9kb3MoKTtcbiAgfVxuXG4gIGRlbGV0ZShsaXN0KSB7XG4gICAgbGlzdC5zcGxpY2UobGlzdC5pbmRleE9mKHRoaXMpLCAxKTtcblxuICAgIHJlbmRlclRvZG9zKCk7XG4gIH1cblxuICBtb3ZlKGN1cnJlbnRMaXN0LCBuZXdMaXN0KSB7XG4gICAgdGhpcy5kZWxldGUoY3VycmVudExpc3QsIHRoaXMpO1xuICAgIHRoaXMuYWRkKHRoaXMsIG5ld0xpc3QpO1xuICB9XG5cbiAgZWRpdChuZXdUaXRsZSwgbmV3RGVzY3JpcHRpb24sIG5ld0R1ZURhdGUsIG5ld1ByaW9yaXR5KSB7XG4gICAgdGhpcy50aXRsZSA9IG5ld1RpdGxlO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBuZXdEZXNjcmlwdGlvbjtcbiAgICB0aGlzLmR1ZURhdGUgPSBuZXdEdWVEYXRlO1xuICAgIHRoaXMucHJpb3JpdHkgPSBuZXdQcmlvcml0eTtcblxuICAgIHJlbmRlclRvZG9zKCk7XG4gIH1cbn1cbiIsImltcG9ydCBUb2RvIGZyb20gJy4vTW9kdWxlcy9Ub2RvJztcblxuY29uc3QgY3JlYXRlVGFza0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG4tY3JlYXRlLXRhc2snKTtcbmNvbnN0IGNyZWF0ZVRhc2tEaWFsb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3JlYXRlLXRhc2stbW9kYWwnKTtcblxuY29uc3QgY3JlYXRlVGFza0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY3JlYXRlLXRhc2snKTtcbi8vIGZvcm0gaW5wdXRzXG5jb25zdCBmb3JtVGFza1RpdGxlID0gY3JlYXRlVGFza0Zvcm1bMF07XG5jb25zdCBmb3JtVGFza0Rlc2NyaXB0aW9uID0gY3JlYXRlVGFza0Zvcm1bMV07XG5jb25zdCBmb3JtVGFza0R1ZURhdGUgPSBjcmVhdGVUYXNrRm9ybVszXTtcblxuY29uc3QgZm9ybUFkZEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG4tYWRkLXRhc2snKTtcbmNvbnN0IGVkaXRUYXNrQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bi1zYXZlLWNoYW5nZXMnKTtcblxuY29uc3Qgc2FtcGxlUHJvamVjdCA9IFtdO1xuXG5jb25zdCB0YXNrQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2tzLWxpc3QnKTtcblxuY3JlYXRlVGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgLy8gZ2V0IGlucHV0IHZhbHVlIGFuZCBhc3NpZ24gaXQgdG8gZm9ybSBpbnB1dCB0aXRsZVxuICBsZXQgaW5wdXRWYWx1ZSA9IGNyZWF0ZVRhc2tCdXR0b24ucGFyZW50RWxlbWVudFswXS52YWx1ZTtcblxuICBpZiAoaW5wdXRWYWx1ZSA9PT0gJycpIHtcbiAgICBhbGVydCgnRW50ZXIgYSBUYXNrIFRpdGxlJyk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZm9ybVRhc2tUaXRsZS52YWx1ZSA9IGlucHV0VmFsdWU7XG4gIGNyZWF0ZVRhc2tCdXR0b24ucGFyZW50RWxlbWVudFswXS52YWx1ZSA9ICcnO1xuXG4gIGNyZWF0ZVRhc2tEaWFsb2cuc2hvd01vZGFsKCk7XG59KTtcblxuZm9ybUFkZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgY29uc3QgdG9kbyA9IGNyZWF0ZVRvZG8oKTtcbiAgdG9kby5hZGQoc2FtcGxlUHJvamVjdCk7XG5cbiAgcmVuZGVyVG9kb3Moc2FtcGxlUHJvamVjdCk7XG5cbiAgY3JlYXRlVGFza0RpYWxvZy5jbG9zZSgpO1xuICBjcmVhdGVUYXNrRm9ybS5yZXNldCgpO1xufSk7XG5cbmNyZWF0ZVRhc2tGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbn0pO1xuXG5mdW5jdGlvbiBjcmVhdGVUb2RvKCkge1xuICBjb25zdCB0YXNrVGl0bGUgPSBmb3JtVGFza1RpdGxlLnZhbHVlO1xuICBjb25zdCB0YXNrRGVzY3JpcHRpb24gPSBmb3JtVGFza0Rlc2NyaXB0aW9uLnZhbHVlO1xuICBjb25zdCB0YXNrRHVlRGF0ZSA9IGZvcm1UYXNrRHVlRGF0ZS52YWx1ZSA/PyAnTm9uZSc7XG4gIGNvbnN0IHRhc2tQcmlvcml0eSA9IGdldFRhc2tQcmlvcml0eSgpID8/ICdOb25lJztcblxuICAvLyBjcmVhdGUgYSB0b2RvIG9iamVjdCBhbmQgYWRkIGl0IHRvIGEgcHJvamVjdC9saXN0XG4gIGNvbnN0IHRvZG8gPSBuZXcgVG9kbyh0YXNrVGl0bGUsIHRhc2tEZXNjcmlwdGlvbiwgdGFza0R1ZURhdGUsIHRhc2tQcmlvcml0eSk7XG4gIHJldHVybiB0b2RvO1xufVxuXG5mdW5jdGlvbiBnZXRUYXNrUHJpb3JpdHkoKSB7XG4gIGNvbnN0IHByaW9yaXRpZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFtuYW1lPVwicHJpb3JpdHlcIl0nKTtcblxuICBsZXQgdGFza1ByaW9yaXR5O1xuXG4gIGZvciAoY29uc3QgcHJpb3JpdHkgb2YgcHJpb3JpdGllcykge1xuICAgIGlmIChwcmlvcml0eS5jaGVja2VkKSB7XG4gICAgICB0YXNrUHJpb3JpdHkgPSBwcmlvcml0eS52YWx1ZTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGFza1ByaW9yaXR5O1xufVxuXG4vLyBkaXNwbGF5IHRvZG8gZnJvbSBwcm9qZWN0L2xpc3QgYXJyYXlcbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJUb2RvcygpIHtcbiAgY29uc3QgZnJhZ21lbnQgPSBuZXcgRG9jdW1lbnRGcmFnbWVudCgpO1xuICB0YXNrQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICBzYW1wbGVQcm9qZWN0LmZvckVhY2goKHRvZG8pID0+IHtcbiAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChjcmVhdGVUb2RvQ2FyZCh0b2RvKSk7XG4gIH0pO1xuXG4gIHRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xufVxuXG4vLyBjcmVhdGUgY2FyZCBmb3IgdG9kbyBvYmplY3QgdG8gZGlzcGxheVxuZnVuY3Rpb24gY3JlYXRlVG9kb0NhcmQodGFzaykge1xuICBjb25zdCB0b2RvID0gY3JlYXRlRGl2KCd0YXNrJyk7XG5cbiAgY29uc3QgdG9wRGl2ID0gY3JlYXRlRGl2KCd0b3AnKTtcbiAgY29uc3QgdG9kb0NoZWNrQm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgdG9kb0NoZWNrQm94LnR5cGUgPSAnY2hlY2tib3gnO1xuICBjb25zdCB0YXNrVGl0bGVIZWFkaW5nID0gY3JlYXRlSGVhZGluZygnaDMnLCB0YXNrLnRpdGxlLCAndGFzay10aXRsZScpO1xuICBjb25zdCBidXR0b25Db250YWluZXIgPSBjcmVhdGVEaXYoJ3Rhc2stYnRuLWNvbnRhaW5lcicpO1xuICBidXR0b25Db250YWluZXIuYXBwZW5kKFxuICAgIGNyZWF0ZVNob3dEZXRhaWxzQnRuKHRhc2spLFxuICAgIGNyZWF0ZUVkaXRUYXNrQnRuKHRhc2spLFxuICAgIGNyZWF0ZVJlbW92ZVRhc2tCdG4odGFzaywgdG9kbyksXG4gICk7XG5cbiAgdG9wRGl2LmFwcGVuZCh0b2RvQ2hlY2tCb3gsIHRhc2tUaXRsZUhlYWRpbmcsIGJ1dHRvbkNvbnRhaW5lcik7XG5cbiAgY29uc3QgYm90dG9tRGl2ID0gY3JlYXRlRGl2KCdib3R0b20nKTtcbiAgY29uc3QgdGFza1Byb2plY3RIZWFkaW5nID0gY3JlYXRlSGVhZGluZygnaDUnLCAnU2FtcGxlJywgJycpO1xuICBjb25zdCB0YXNrRHVlRGF0ZUhlYWRpbmcgPSBjcmVhdGVIZWFkaW5nKCdoNScsIHRhc2suZHVlRGF0ZSwgJycpO1xuICBjb25zdCB0YXNrUHJpb3JpdHlIZWFkaW5nID0gY3JlYXRlSGVhZGluZygnaDUnLCB0YXNrLnByaW9yaXR5LCAnJyk7XG5cbiAgYm90dG9tRGl2LmFwcGVuZCh0YXNrUHJvamVjdEhlYWRpbmcsIHRhc2tEdWVEYXRlSGVhZGluZywgdGFza1ByaW9yaXR5SGVhZGluZyk7XG5cbiAgdG9kby5hcHBlbmQodG9wRGl2LCBib3R0b21EaXYpO1xuXG4gIHJldHVybiB0b2RvO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVEaXYoZGl2Q2xhc3MpIHtcbiAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGRpdi5jbGFzc0xpc3QuYWRkKGRpdkNsYXNzKTtcblxuICByZXR1cm4gZGl2O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVIZWFkaW5nKGhlYWRpbmdUeXBlLCBoZWFkaW5nVGV4dENvbnRlbnQsIGhlYWRpbmdDbGFzcykge1xuICBjb25zdCBoZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChoZWFkaW5nVHlwZSk7XG4gIGhlYWRpbmcudGV4dENvbnRlbnQgPSBoZWFkaW5nVGV4dENvbnRlbnQ7XG5cbiAgLy8gYWRkIGNsYXNzIGlmIGhlYWRpbmdDbGFzcyBoYXMgdmFsdWVcbiAgaWYgKCFoZWFkaW5nQ2xhc3MgPT09ICcnKSBoZWFkaW5nLmNsYXNzTGlzdC5hZGQoaGVhZGluZ0NsYXNzKTtcblxuICByZXR1cm4gaGVhZGluZztcbn1cblxuZnVuY3Rpb24gY3JlYXRlUmVtb3ZlVGFza0J0bih0b2RvT2JqZWN0LCB0b2RvQ2FyZCkge1xuICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgYnV0dG9uLnRleHRDb250ZW50ID0gJ1JlbW92ZSc7XG4gIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBpZiAoY29uZmlybSgnRGVsZXRlIHRoaXMgdG9kbz8nKSkge1xuICAgICAgdG9kb09iamVjdC5kZWxldGUoc2FtcGxlUHJvamVjdCk7XG4gICAgICB0YXNrQ29udGFpbmVyLnJlbW92ZUNoaWxkKHRvZG9DYXJkKTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBidXR0b247XG59XG5cbi8vIGVkaXQgdGFzayBidXR0b25cbmZ1bmN0aW9uIGNyZWF0ZUVkaXRUYXNrQnRuKHRvZG9PYmplY3QpIHtcbiAgbGV0IGlzQ2xpY2tlZCA9IGZhbHNlO1xuICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgYnV0dG9uLnRleHRDb250ZW50ID0gJ0VkaXQnO1xuICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgaXNDbGlja2VkID0gdHJ1ZTtcblxuICAgIGNvbnNvbGUubG9nKHRvZG9PYmplY3QpO1xuICAgIGNyZWF0ZVRhc2tEaWFsb2cuc2hvd01vZGFsKCk7XG4gICAgZWRpdFRhc2tCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgZm9ybUFkZEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICBmb3JtVGFza1RpdGxlLnZhbHVlID0gdG9kb09iamVjdC50aXRsZTtcbiAgICBmb3JtVGFza0Rlc2NyaXB0aW9uLnZhbHVlID0gdG9kb09iamVjdC5kZXNjcmlwdGlvbjtcbiAgICBmb3JtVGFza0R1ZURhdGUudmFsdWUgPSB0b2RvT2JqZWN0LmR1ZURhdGU7XG4gICAgc2V0VGFza1ByaW9yaXR5KHRvZG9PYmplY3QpO1xuICB9KTtcblxuICBlZGl0VGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFxuICAgICdjbGljaycsXG4gICAgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGlmICghaXNDbGlja2VkKSByZXR1cm47XG5cbiAgICAgIGVkaXRUb2RvKHRvZG9PYmplY3QpO1xuXG4gICAgICBlZGl0VGFza0J1dHRvbi5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgIGZvcm1BZGRCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG5cbiAgICAgIGNyZWF0ZVRhc2tEaWFsb2cuY2xvc2UoKTtcbiAgICAgIGNyZWF0ZVRhc2tGb3JtLnJlc2V0KCk7XG4gICAgfSxcbiAgICB7IG9uY2U6IHRydWUgfSxcbiAgKTtcblxuICByZXR1cm4gYnV0dG9uO1xufVxuXG5mdW5jdGlvbiBzZXRUYXNrUHJpb3JpdHkodG9kbykge1xuICBjb25zdCBwcmlvcml0aWVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbbmFtZT1cInByaW9yaXR5XCJdJyk7XG5cbiAgZm9yIChjb25zdCBwcmlvcml0eSBvZiBwcmlvcml0aWVzKSB7XG4gICAgaWYgKHByaW9yaXR5LnZhbHVlID09PSB0b2RvLnByaW9yaXR5KSB7XG4gICAgICBwcmlvcml0eS5jaGVja2VkID0gdHJ1ZTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBlZGl0VG9kbyh0b2RvKSB7XG4gIHRvZG8uZWRpdChcbiAgICBmb3JtVGFza1RpdGxlLnZhbHVlLFxuICAgIGZvcm1UYXNrRGVzY3JpcHRpb24udmFsdWUsXG4gICAgZm9ybVRhc2tEdWVEYXRlLnZhbHVlLFxuICAgIGdldFRhc2tQcmlvcml0eSgpLFxuICApO1xuICBjb25zb2xlLmxvZyhzYW1wbGVQcm9qZWN0KTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlU2hvd0RldGFpbHNCdG4odG9kbykge1xuICBjb25zdCBkZXRhaWxzTW9kYWwgPSBjcmVhdGVEZXRhaWxzTW9kYWwodG9kbyk7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZGV0YWlsc01vZGFsKTtcbiAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gIGJ1dHRvbi50ZXh0Q29udGVudCA9ICdEZXRhaWxzJztcbiAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGRldGFpbHNNb2RhbC5zaG93TW9kYWwoKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGJ1dHRvbjtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRGV0YWlsc01vZGFsKHRvZG8pIHtcbiAgY29uc3QgZGlhbG9nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGlhbG9nJyk7XG4gIGRpYWxvZy5jbGFzc0xpc3QuYWRkKCdkZXRhaWxzLW1vZGFsJyk7XG5cbiAgY29uc3QgdGl0bGUgPSBjcmVhdGVIZWFkaW5nKCdoMycsIHRvZG8udGl0bGUsICcnKTtcbiAgY29uc3QgZGVzY3JpcHRpb24gPSBjcmVhdGVIZWFkaW5nKCdoMycsIHRvZG8uZGVzY3JpcHRpb24sICcnKTtcbiAgY29uc3QgcHJvamVjdCA9IGNyZWF0ZUhlYWRpbmcoJ2gzJywgJ1NhbXBsZScsICcnKTtcbiAgY29uc3QgZHVlRGF0ZSA9IGNyZWF0ZUhlYWRpbmcoJ2gzJywgdG9kby5kdWVEYXRlLCAnJyk7XG4gIGNvbnN0IHByaW9yaXR5ID0gY3JlYXRlSGVhZGluZygnaDMnLCB0b2RvLnByaW9yaXR5LCAnJyk7XG5cbiAgY29uc3QgY2xvc2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgY2xvc2VCdXR0b24udGV4dENvbnRlbnQgPSAnZXhpdCc7XG4gIGNsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGRpYWxvZy5jbG9zZSgpO1xuICB9KTtcblxuICBkaWFsb2cuYXBwZW5kKHRpdGxlLCBkZXNjcmlwdGlvbiwgcHJvamVjdCwgZHVlRGF0ZSwgcHJpb3JpdHksIGNsb3NlQnV0dG9uKTtcblxuICByZXR1cm4gZGlhbG9nO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==