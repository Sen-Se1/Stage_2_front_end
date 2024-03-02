import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { alert } from '../utils/alert';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css'
})
export class UpdateProfileComponent {
  constructor(private auth: AuthService, private route: ActivatedRoute) {
    this.alertService = new alert();
  }
  alertService: alert;
  data = {
    id: '',
    username: '',
    email: '',
    password: ''
  }
  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.route.params.subscribe(params => {
        this.data.id = params['id']; // Retrieve the ID from the route parameters        
        this.auth.profile(this.data.id).subscribe((res: any) => {
          this.data = {
            id: res.data._id,
            username: res.data.username,
            email: res.data.email,
            password: ''
          }
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
      });
    }
  }
  updateProfileForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9]+$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });
  get UsernameProfile() {
    return this.updateProfileForm.get('username') as FormControl;
  }
  get EmailProfile() {
    return this.updateProfileForm.get('email') as FormControl;
  }
  get PasswordProfile() {
    return this.updateProfileForm.get('password') as FormControl;
  }
  update() {
    this.auth.updateProfile(this.data.id, this.data).subscribe((res: any) => {
      this.updateProfileForm.reset({
        username: this.data.username,
        email: this.data.email,
        password: ''
      });
      this.alertService.success('Avec succès', `Votre profil a été mis à jour avec succès.`)
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
  changePwd(id: any) {
    this.auth.updateBtn("/update/profile/password/", id)
  }
}
