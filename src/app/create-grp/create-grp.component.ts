import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { alert } from '../utils/alert';

@Component({
  selector: 'app-create-grp',
  templateUrl: './create-grp.component.html',
  styleUrl: './create-grp.component.css'
})
export class CreateGrpComponent {
  constructor(private auth: AuthService) {
    this.alertService = new alert();
  }
  alertService: alert;
  data = {
    codeG: '',
    libelle: '',
    codeD: 'default'
  }
  departments: any[] = [];
  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.auth.getAllDep().subscribe((res: any) => {
        this.departments = res.data;
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

  createGrpForm = new FormGroup({
    label: new FormControl('', [Validators.required]),
    codeD: new FormControl('', [Validators.required, this.departmentValidator]),
    code: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9]+$/)])
  });
  departmentValidator(control: AbstractControl): ValidationErrors | null {
    if (control.value === 'default') {
      return { invalidDepartment: true };
    }
    return null;
  }
  get Code(): FormControl {
    return this.createGrpForm.get('code') as FormControl;
  }
  get Label(): FormControl {
    return this.createGrpForm.get('label') as FormControl;
  }
  get CodeD(): FormControl {
    return this.createGrpForm.get('codeD') as FormControl;
  }
  create() {
    this.auth.createGrp(this.data).subscribe((res: any) => {
      this.createGrpForm.reset({
        code: '',
        label: '',
        codeD: 'default'
      });
      this.alertService.success('Successfully', `A new group has been created successfully`)
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
