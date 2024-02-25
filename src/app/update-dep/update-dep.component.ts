import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { alert } from '../utils/alert';

@Component({
  selector: 'app-update-dep',
  templateUrl: './update-dep.component.html',
  styleUrl: './update-dep.component.css'
})
export class UpdateDepComponent {
  data = {
    codeD: '',
    libelle: ''
  }
  idDep = ''
  constructor(private auth: AuthService, private route: ActivatedRoute) {
    this.alertService = new alert();
  }
  alertService: alert;
  ngOnInit() {
    if (this.auth.isAdminMod()) {
      this.route.params.subscribe(params => {
        this.idDep = params['id']; // Retrieve the ID from the route parameters
        this.auth.getByIdDep(this.idDep).subscribe((res: any) => {
          this.data = {
            codeD: res.data.codeD,
            libelle: res.data.libelle
          }
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
      });
    }
  }

  updateDepForm = new FormGroup({
    label: new FormControl('', [Validators.required]),
    code: new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-Z0-9]+$/)])
  });

  get Code(): FormControl {
    return this.updateDepForm.get('code') as FormControl;
  }
  get Label(): FormControl {
    return this.updateDepForm.get('label') as FormControl;
  }
  update() {
    this.auth.updateDep(this.idDep, this.data).subscribe((res: any) => {
      this.alertService.success('Successfully', `The department has been updated successfully for the owner of the label: ${res.data.libelle}`)
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
