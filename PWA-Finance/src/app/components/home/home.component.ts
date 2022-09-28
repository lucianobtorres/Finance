import { Component, OnInit  } from '@angular/core';
import { liveQuery } from 'dexie';
import { db, TodoList } from 'src/app/db/finance-db';


export class Todo {
  desc!: string;
}

@Component({
  selector: 'fi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  todoLists$ = liveQuery(() => db.todoLists.toArray());
  listName = 'My new list';

  todo: Todo = new Todo();
  todos: Todo[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  async addNewList() {
    await db.todoLists.add({
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
