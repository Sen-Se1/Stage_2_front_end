import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { alert } from '../utils/alert';
@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrl: './forgot-pass.component.css'
})
export class ForgotPassComponent {
  constructor(private auth: AuthService) {
    this.alertService = new alert();
  }
  alertService: alert;
  data = {
    email: '',
  }
  ngOnInit(): void {
    if (this.auth.isLoggedInForgot()) { return }
  }
  forgotForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  get Email(): FormControl {
    return this.forgotForm.get('email') as FormControl;
  }

  send() {
    this.auth.forgotPass(this.data).subscribe((res: any) => {      
      this.alertService.success(`Avec succès`, `${res.message}`)
      this.forgotForm.reset({
        email: ''
      });
    }, err => {
      if (err.status === 0) {
        return this.alertService.danger("Problème système", "Nous avons un bug au niveau du serveur qui sera corrigé prochainement.");
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
