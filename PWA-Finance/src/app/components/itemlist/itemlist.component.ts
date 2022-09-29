import { Component, Input } from '@angular/core';
import { liveQuery } from 'dexie';
import { dbTodo, TodoList } from 'src/app/db/todo-db';

@Component({
  selector: 'fi-itemlist',
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.scss']
})
export class ItemlistComponent {
  @Input() todoList!: TodoList;

  todoItems$ = liveQuery(
    () => this.listTodoItems()
  );

  async listTodoItems() {
    return await dbTodo.todoItems
      .where({
        todoListId: this.todoList.id,
      })
      .toArray();
  }

  async addItem() {
    await dbTodo.todoItems.add({
      title: this.itemName,
      todoListId: this.todoList.id,
    });
  }

  itemName = 'My new item';
}
