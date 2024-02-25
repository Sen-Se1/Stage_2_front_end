import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { alert } from '../utils/alert';

@Component({
  selector: 'app-update-stg',
  templateUrl: './update-stg.component.html',
  styleUrl: './update-stg.component.css'
})
export class UpdateStgComponent {
  constructor(private auth: AuthService, private route: ActivatedRoute) {
    this.alertService = new alert();
  }
  alertService: alert;
  data = {
    id: '',
    codeS: '',
    type: 'default',
    duree: ''
  }
  departments: any[] = [];
  ngOnInit() {
    if (this.auth.isAdminMod()) {
      this.route.params.subscribe(params => {
        this.data.id = params['id']; // Retrieve the ID from the route parameters
        this.auth.getByIdStage(this.data.id).subscribe((res: any) => {
          this.data = {
            id: res.data._id,
            codeS: res.data.codeS,
            type: this.auth.capitalizeFirstLetter(res.data.type),
            duree: res.data.duree
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

  updateStgForm = new FormGroup({
    code: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9]+$/)]),
    type: new FormControl('', [Validators.required, this.stageValidator]),
    duration: new FormControl('', [Validators.required, Validators.pattern(/^[1-9]\d*$/)])
  });
  stageValidator(control: AbstractControl): ValidationErrors | null {
    if (control.value === 'default') {
      return { invalidType: true };
    }
    return null;
  }
  get Code(): FormControl {
    return this.updateStgForm.get('code') as FormControl;
  }

  get Type(): FormControl {
    return this.updateStgForm.get('type') as FormControl;
  }

  get Duration(): FormControl {
    return this.updateStgForm.get('duration') as FormControl;
  }
  update() {
    this.auth.updateStage(this.data.id, this.data).subscribe((res: any) => {
      this.alertService.success('Successfully', `The stage has been updated successfully for the owner of the code: ${res.data.codeS}`)
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
