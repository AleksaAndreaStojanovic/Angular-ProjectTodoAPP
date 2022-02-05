import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from 'src/app/models/todo';
import { User } from 'src/app/models/user';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];

  selectedTodo: Todo = {};

  user: User = {};

  searchValue: string; // for search [(ngModel)]

  constructor(private todoService: TodoService, private router: Router) {}

  ngOnInit(): void {
    this.todoService.stateClear.subscribe((clear) => {
      if (clear) {
        this.selectedTodo = {
          id: null,
          userId: null,
          title: null,
          completed: null,
        };
      }
    });

    if (localStorage.getItem('logged_in_user') !== null) {
      const user: User = JSON.parse(
        localStorage.getItem('logged_in_user')
      ) as User;
      this.user = user;
      this.todoService.getTodosByUserId(this.user.id).subscribe((todos) => {
        this.todos = todos.sort((todo) => {
          return todo.completed ? 1 : -1; // `false` values first
        });
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  // Add
  addTodo(todo: Todo) {
    this.todoService
      .addTodo(todo)
      .subscribe((todo) => this.todos.unshift(todo));
  }

  // Update
  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo).subscribe((todo) => {
      this.todos.forEach((element, index) => {
        if (element.id === todo.id) {
          this.todos[index] = todo;
        }
      });
    });
  }

  // Update completed
  toggleComplete(todo: Todo) {
    todo.completed = !todo.completed;

    this.todoService.updateTodo(todo).subscribe((todo) => console.log(todo));
  }

  // Delete
  onDelete(id: number) {
    if (window.confirm('Are you sure?')) {
      this.todoService.deleteTodo(id).subscribe(() => {
        this.todos.forEach((curr, i) => {
          if (id === curr.id) {
            this.todos.splice(i, 1);
          }
        });
      });
    }
  }

  // Select todo
  onSelect(todo: Todo) {
    this.todoService.setFormTodo(todo);
    this.selectedTodo = todo;
  }
}
