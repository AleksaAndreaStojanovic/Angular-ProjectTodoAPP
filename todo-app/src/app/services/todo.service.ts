import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Todo } from '../models/todo';
import { BehaviorSubject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private url: string = 'http://localhost:5000/todos';

  private todoSource = new BehaviorSubject<Todo>({
    id: null,
    userId: null,
    title: null,
    completed: null,
  });
  selectedTodo = this.todoSource.asObservable();

  private stateSource = new BehaviorSubject<boolean>(true);
  stateClear = this.stateSource.asObservable();

  constructor(private http: HttpClient) {}

  getTodosById(id: number) {
    const modUrl: string = `${this.url}/${id}`;
    return this.http.get<Todo>(modUrl);
  }

  getTodosByUserId(userId: number) {
    const modUrl: string = `${this.url}?userId=${userId}`;
    return this.http.get<Todo[]>(modUrl);
  }

  addTodo(todo: Todo) {
    return this.http.post<Todo>(this.url, todo, httpOptions);
  }

  updateTodo(todo: Todo) {
    const modUrl: string = `${this.url}/${todo.id}`;
    return this.http.put<Todo>(modUrl, todo, httpOptions);
  }

  deleteTodo(id: number) {
    const modUrl: string = `${this.url}/${id}`;
    return this.http.delete<Todo[]>(modUrl, httpOptions);
  }

  setFormTodo(todo: Todo) {
    this.todoSource.next(todo);
  }

  clearState() {
    this.stateSource.next(true);
  }
}
