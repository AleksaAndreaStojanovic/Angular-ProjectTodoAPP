import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url: string = 'http://localhost:5000/users';

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<User[]>(this.url);
  }

  getUser(username: string, password: string) {
    const modUrl: string = `${this.url}?username=${username}&password=${password}`;
    return this.http.get<User[]>(modUrl);
  }

  addUser(user: User) {
    return this.http.post<User>(this.url, user, httpOptions);
  }
}
