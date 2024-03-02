import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { alert } from '../utils/alert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  constructor(private auth: AuthService) {
    this.alertService = new alert();
  }
  alertService: alert;
  data = {
    id: '',
    username: '',
    email: '',
    role: ''
  }
  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.auth.profile(this.auth.idFormToken()).subscribe((res: any) => {
        this.data = {
          id: res.data._id,
          username: res.data.username,
          email: res.data.email,
          role: this.auth.convertToTitleCase(res.data.role)
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
    }
  }
  update(id: any) {
    this.auth.updateBtn("/update/profile/", id)
  }
}
