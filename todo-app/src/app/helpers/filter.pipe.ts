import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../models/todo';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(todos: Todo[], searchInput?: string) {
    if (!todos) return null;
    if (!searchInput) return todos;

    searchInput = searchInput.toLowerCase();

    return todos.filter((todo) => {
      return todo.title.toLowerCase().includes(searchInput);
    });
  }
}
