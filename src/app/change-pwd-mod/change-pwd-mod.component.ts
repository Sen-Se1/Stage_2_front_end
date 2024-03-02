import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { alert } from '../utils/alert';

@Component({
  selector: 'app-change-pwd-mod',
  templateUrl: './change-pwd-mod.component.html',
  styleUrl: './change-pwd-mod.component.css'
})
export class ChangePwdModComponent {
  constructor(private auth: AuthService, private route: ActivatedRoute) {
    this.alertService = new alert();
  }
  alertService: alert;
  data = {
    password: '',
    passwordConfirm: '',
  }
  idModAdmin = ''
  ngOnInit(): void {
    if (this.auth.isAdminMod()) {
      this.route.params.subscribe(params => {
        this.idModAdmin = params['id']; // Retrieve the ID from the route parameters
      });
    }
  }
  changePwd() {
    this.auth.updatePwdModAdmin(this.idModAdmin, this.data).subscribe((res: any) => {
      this.pudatePwdModForm.reset({
        password: '',
        passwordConfirm: '',
      });
      this.alertService.success('Avec succès', `Un mot de passe a été mis à jour avec succès.`)
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
  pudatePwdModForm = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  get Password(): FormControl {
    return this.pudatePwdModForm.get('password') as FormControl;
  }
  get PasswordConfirm(): FormControl {
    return this.pudatePwdModForm.get('passwordConfirm') as FormControl;
  }

}
