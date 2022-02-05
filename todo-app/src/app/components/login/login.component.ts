import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm = this.formBuilder.group({
    username: '',
    password: '',
  });

  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('logged_in_user') !== null) {
      const user: User = JSON.parse(
        localStorage.getItem('logged_in_user')
      ) as User;

      console.log('Already logged in: ', user);

      this.router.navigate(['/']);
    }
  }

  onSubmit() {
    const { username, password } = this.loginForm.value;

    // check auth
    this.userService.getUser(username, password).subscribe((users) => {
      if (users.length > 0) {
        localStorage.setItem('logged_in_user', JSON.stringify(users[0]));
        this.router.navigate(['/']);
      } else {
        window.alert('Wrong username/password');
      }
    });
  }
}
