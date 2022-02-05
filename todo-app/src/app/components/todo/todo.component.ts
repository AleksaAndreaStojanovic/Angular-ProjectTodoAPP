import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
})
export class TodoComponent implements OnInit {
  todo: Todo = {};

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id: number = +this.route.snapshot.paramMap.get('id');

    this.todoService.getTodosById(id).subscribe((todo) => {
      this.todo = todo;
      console.log(todo);
    });
  }
}
