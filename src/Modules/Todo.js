import { renderTodos } from '../index';

export default class Todo {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }

  add(list) {
    list.push(this);

    renderTodos();
  }

  delete(list) {
    list.splice(list.indexOf(this), 1);

    renderTodos();
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

    renderTodos();
  }
}
