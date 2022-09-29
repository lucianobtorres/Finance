import Dexie, { Table } from 'dexie';

export interface TodoList {
  id?: number;
  title: string;
}
export interface TodoItem {
  id?: number;
  todoListId: number | undefined;
  title: string;
  done?: boolean;
}

export class TodoDB extends Dexie {
  todoItems!: Table<TodoItem, number>;
  todoLists!: Table<TodoList, number>;

  constructor() {
    super('ngdexieliveQuery');
    this.version(1).stores({
      todoLists: '++id',
      todoItems: '++id, todoListId',
    });
    this.on('populate', () => this.populate());
  }

  async populate() {
    const todoListId = await dbTodo.todoLists.add({
      title: 'To Do Today',
    });
    await dbTodo.todoItems.bulkAdd([
      {
        todoListId,
        title: 'Feed the birds',
      },
      {
        todoListId,
        title: 'Watch a movie',
      },
      {
        todoListId,
        title: 'Have some sleep',
      },
    ]);
  }
}

export const dbTodo = new TodoDB();
