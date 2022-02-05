import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  registerForm = this.formBuilder.group({
    firstName: '',
    lastName: '',
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
    const user: User = this.registerForm.value as User;

    if (user) {
      // register
      this.userService.addUser(user).subscribe((user) => {
        localStorage.setItem('logged_in_user', JSON.stringify(user));
        this.router.navigate(['/']);
      });
    }
  }
}
