export default class Todo {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }

  add(todo, list) {
    list.push(todo);
  }

  delete(list, todo) {
    list.splice(list.indexOf(todo), 1);
  }

  move(todo, currentList, newList) {
    this.delete(currentList, todo);
    newList.push(todo);
  }

  edit(todo, ...value) {
    todo.title = value[0];
    todo.description = value[1];
    todo.dueDate = value[2];
    todo.priority = value[3];
  }
}
