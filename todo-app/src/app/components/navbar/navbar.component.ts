import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  user: User = {};

  constructor(private router: Router) {}

  ngOnInit(): void {}

  getLoggedInUser(): boolean {
    if (localStorage.getItem('logged_in_user') !== null) {
      const user: User = JSON.parse(
        localStorage.getItem('logged_in_user')
      ) as User;
      this.user = user;
      return true;
    }
    return false;
  }

  onLogout() {
    if (localStorage.getItem('logged_in_user') !== null) {
      localStorage.removeItem('logged_in_user');
      this.user = {};
      this.router.navigate(['/login']);
    }
  }
}
