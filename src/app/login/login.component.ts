import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { alert } from '../utils/alert';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private auth: AuthService) {
    this.alertService = new alert();
  }
  alertService: alert;
  data = {
    email: '',
    password: ''
  }
  ngOnInit(): void {
    if (!this.auth.isLoggedIn()) { return }
  }
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });
  get Email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }
  get Password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }
  login() {
    this.auth.login(this.data).subscribe((res: any) => {
      this.auth.loginProcess(res);
      this.alertService.success(` `, `Welcome back ${res.data.username}`)
    }, err => {
      if (err.status === 0) {
        return this.alertService.danger("System glitch", "We have a server-level bug that will be fixed shortly");
      }
      if (err.error.message) {
        return this.alertService.danger(err.error.status, err.error.message);
      }
      if (err.error.errors[0].msg) {
        return this.alertService.danger(err.statusText, err.error.errors[0].msg);
      }
    })
  }
}
