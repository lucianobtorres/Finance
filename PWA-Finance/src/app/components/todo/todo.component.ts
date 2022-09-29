import { Component, OnInit  } from '@angular/core';
import { liveQuery } from 'dexie';
import { dbTodo, TodoList } from 'src/app/db/todo-db';


export class Todo {
  desc!: string;
}

@Component({
  selector: 'fi-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  todoLists$ = liveQuery(() => dbTodo.todoLists.toArray());
  listName = 'My new list';

  todo: Todo = new Todo();
  todos: Todo[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  async addNewList() {
    await dbTodo.todoLists.add({
      title: this.listName,
    });
  }

  identifyList(index: number, list: TodoList) {
    return `${list.id}${list.title}`;
  }

  save(todo: Todo) {
    this.todos.push(todo);
    this.todo = new Todo();
    this.todos = Object.assign([], this.todos);
  }
  delete(todo: Todo) {
    this.todos.splice(this.todos.indexOf(todo), 1);
  }

}
