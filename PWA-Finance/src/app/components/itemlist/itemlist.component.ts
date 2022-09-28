import { Component, Input } from '@angular/core';
import { liveQuery } from 'dexie';
import { db, TodoList } from 'src/app/db/finance-db';

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
    return await db.todoItems
      .where({
        todoListId: this.todoList.id,
      })
      .toArray();
  }

  async addItem() {
    await db.todoItems.add({
      title: this.itemName,
      todoListId: this.todoList.id,
    });
  }

  itemName = 'My new item';
}
