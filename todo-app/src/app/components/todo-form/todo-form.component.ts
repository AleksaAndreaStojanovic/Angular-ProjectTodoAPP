import { Component, EventEmitter, OnInit, Output, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Todo } from 'src/app/models/todo';
import { User } from 'src/app/models/user';
import { TodoService } from 'src/app/services/todo.service';
import { AppState } from 'src/app/app.state';
import { AppStore } from 'src/app/app.store';
import { Store } from 'redux';
import * as CounterActions from '../../counter.actions';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
})
export class TodoFormComponent implements OnInit {
  todoForm = this.formBuilder.group({
    id: '',
    title: '',
    priority: 1,
    completed: '',
  });

  isNew: boolean = true;

  @Output() onAddEvent: EventEmitter<Todo> = new EventEmitter();
  @Output() onUpdateEvent: EventEmitter<Todo> = new EventEmitter();

  constructor(
    @Inject(AppStore) private store: Store<AppState>,
    private formBuilder: FormBuilder,
    private todoService: TodoService
  ) {
    store.subscribe(() => this.readState());
    this.readState();
  }

  ngOnInit(): void {
    // Subscribe to the selected todo observable
    this.todoService.selectedTodo.subscribe((todo) => {
      if (todo.id != null) {
        this.isNew = false;
        this.todoForm.controls['id'].setValue(todo.id);
        this.todoForm.controls['title'].setValue(todo.title);
        this.todoForm.controls['priority'].setValue(todo.priority);
        this.todoForm.controls['completed'].setValue(todo.completed);
      }
    });
  }

  onSubmit() {
    if (this.isNew) {
      // add
      console.log('add');

      const { id: userId } = JSON.parse(
        localStorage.getItem('logged_in_user')
      ) as User;
      const { title, priority } = this.todoForm.value;

      const todo: Todo = {
        userId,
        title,
        priority,
        completed: false,
      };

      this.onAddEvent.emit(todo);
    } else {
      // update
      console.log('update');

      const { id: userId } = JSON.parse(
        localStorage.getItem('logged_in_user')
      ) as User;
      const { id, title, completed, priority } = this.todoForm.value;

      const todo: Todo = {
        id,
        userId,
        title,
        priority,
        completed,
      };

      this.onUpdateEvent.emit(todo);
    }

    this.clearState();
  }

  clearState() {
    this.isNew = true;
    this.todoForm.controls['title'].setValue('');
    this.todoForm.controls['priority'].setValue(1);
    this.todoService.clearState();
  }

  readState() {
    const state: AppState = this.store.getState() as AppState;

    if (state.counter <= 1) {
      state.counter = 1;
    } else if (state.counter >= 3) {
      state.counter = 3;
    }

    this.todoForm.controls['priority'].setValue(state.counter);
  }

  more() {
    this.store.dispatch(CounterActions.increment());
  }

  less() {
    this.store.dispatch(CounterActions.decrement());
  }
}
