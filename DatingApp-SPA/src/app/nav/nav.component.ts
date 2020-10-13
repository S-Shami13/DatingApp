import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};

  constructor(public authService: AuthService, private alertifyService: AlertifyService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertifyService.success('Login Successfull');
      this.router.navigate(['/members']);
    }, error => {
      this.alertifyService.error(error);
    });
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.alertifyService.messsage('Logged out successfully');
    this.router.navigate(['/home']);
  }
}
