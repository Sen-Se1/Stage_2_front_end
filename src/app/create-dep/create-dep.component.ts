import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { alert } from '../utils/alert';

@Component({
  selector: 'app-create-dep',
  templateUrl: './create-dep.component.html',
  styleUrl: './create-dep.component.css'
})
export class CreateDepComponent {
  constructor(private auth: AuthService) {
    this.alertService = new alert();
  }
  alertService: alert;
  data = {
    codeD: '',
    libelle: ''
  }
  ngOnInit(): void {
    if (this.auth.isLoggedIn()) { return }
  }

  createDepForm = new FormGroup({
    label: new FormControl('', [Validators.required]),
    code: new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-Z0-9]+$/)])
  });

  get Code(): FormControl {
    return this.createDepForm.get('code') as FormControl;
  }
  get Label(): FormControl {
    return this.createDepForm.get('label') as FormControl;
  }
  create() {
    this.auth.createDep(this.data).subscribe((res: any) => {
      this.createDepForm.reset({
        code: '',
        label: ''
      });
      this.alertService.success('Successfully', `A new department has been created successfully`)
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
