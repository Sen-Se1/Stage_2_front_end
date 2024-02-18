import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { alert } from '../utils/alert';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrl: './reset-pass.component.css'
})
export class ResetPassComponent {
  constructor(private auth: AuthService, private route: ActivatedRoute) {
    this.alertService = new alert();
  }
  alertService: alert;
  data = {
    password: '',
    passwordConfirm: ''
  }
  ngOnInit(): void {
    if (this.auth.isLoggedInForgot()) { return }
  }
  resetForm = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  get Password(): FormControl {
    return this.resetForm.get('password') as FormControl;
  }
  get PasswordConfirm(): FormControl {
    return this.resetForm.get('passwordConfirm') as FormControl;
  }

  send() {
    this.route.params.subscribe(params => {
      let token = params['token']; // Retrieve the token from the route parameters
      this.auth.resetPass(token, this.data).subscribe((res: any) => {
        this.alertService.success(`Successfully`, `${res.message}`)
        this.resetForm.reset({
          password: '',
          passwordConfirm: '',
        });
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
    })
  }
}
