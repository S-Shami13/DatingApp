import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../_models/user';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  user: User;
  registerForm: FormGroup;

  constructor(private authService: AuthService, private alertifyService: AlertifyService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      gender: ['male', Validators.required],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: ['null', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [ Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required ]
    }, {validator: this.passwordMatchValidator});
  }
  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : { 'mismatch' : true };
  }
  // tslint:disable-next-line: typedef
  register() {
    this.user = Object.assign({}, this.registerForm.value);
    this.authService.register(this.user).subscribe(() => {
      this.alertifyService.success('Registration successful');
    }, error => {
      this.alertifyService.error(error);
    }, () => {
      this.authService.login(this.user).subscribe(() => {
        this.router.navigate(['/members']);
      });
    });
  }
  // tslint:disable-next-line: typedef
  cancel() {
    this.cancelRegister.emit(false);
    this.alertifyService.warning('Cancelled');
  }
}
