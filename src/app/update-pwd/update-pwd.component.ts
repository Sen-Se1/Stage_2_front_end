import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { alert } from '../utils/alert';

@Component({
  selector: 'app-update-pwd',
  templateUrl: './update-pwd.component.html',
  styleUrl: './update-pwd.component.css'
})
export class UpdatePwdComponent {
  constructor(private auth: AuthService, private route: ActivatedRoute) {
    this.alertService = new alert();
  }
  alertService: alert;
  data = {
    id: '',
    currentPassword: '',
    password: '',
    passwordConfirm: ''
  }
  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.route.params.subscribe(params => {
        this.data.id = params['id']; // Retrieve the ID from the route parameters        
      });
    }
  }
  updateProfilePwdForm = new FormGroup({
    currentPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(8)])

  });
  get upCurrentPasswordProfile() {
    return this.updateProfilePwdForm.get('currentPassword') as FormControl;
  }
  get upPasswordProfile() {
    return this.updateProfilePwdForm.get('password') as FormControl;
  }
  get upPasswordConfirmProfile() {
    return this.updateProfilePwdForm.get('passwordConfirm') as FormControl;
  }
  update() {
    this.auth.updateUserPassword(this.data.id, this.data).subscribe((res: any) => {
      localStorage.setItem('token', res.token);
      this.updateProfilePwdForm.reset({
        currentPassword: '',
        password: '',
        passwordConfirm: '',
      });
      this.alertService.success('Avec succès', `Votre mot de passe a été mis à jour avec succès.`)
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
