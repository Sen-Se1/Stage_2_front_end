import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { alert } from '../utils/alert';

@Component({
  selector: 'app-update-grp',
  templateUrl: './update-grp.component.html',
  styleUrl: './update-grp.component.css'
})
export class UpdateGrpComponent {
  departments: any[] = [];
  idGrp = ''
  data = {
    codeG: '',
    libelle: '',
    codeD: 'default'
  }
  constructor(private auth: AuthService, private route: ActivatedRoute) {
    this.alertService = new alert();
  }
  alertService: alert;
  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.route.params.subscribe(params => {
        this.idGrp = params['id']; // Retrieve the ID from the route parameters
        this.auth.getByIdGrp(this.idGrp).subscribe((res: any) => {
          this.data = {
            codeG: res.data.codeG,
            libelle: res.data.libelle,
            codeD: res.data.codeD._id
          }
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
      });
    }
  }
  updateGrpForm = new FormGroup({
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
    return this.updateGrpForm.get('code') as FormControl;
  }

  get Label(): FormControl {
    return this.updateGrpForm.get('label') as FormControl;
  }

  get CodeD(): FormControl {
    return this.updateGrpForm.get('codeD') as FormControl;
  }
  update() {
    this.auth.updateGrp(this.idGrp, this.data).subscribe((res: any) => {
      this.alertService.success('Successfully', `The group has been updated successfully for the owner of the label: ${res.data.libelle}`)
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
    }
    )
  }
}
