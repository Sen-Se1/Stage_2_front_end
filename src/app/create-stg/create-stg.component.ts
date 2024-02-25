import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { alert } from '../utils/alert';

@Component({
  selector: 'app-create-stg',
  templateUrl: './create-stg.component.html',
  styleUrl: './create-stg.component.css'
})
export class CreateStgComponent {
  constructor(private auth: AuthService) {
    this.alertService = new alert();
  }
  alertService: alert;
  data = {
    codeS: '',
    type: 'default',
    duree: ''
  }
  ngOnInit(): void {
    if (this.auth.isAdminMod()) { return }
  }

  createStgForm = new FormGroup({
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
    return this.createStgForm.get('code') as FormControl;
  }

  get Type(): FormControl {
    return this.createStgForm.get('type') as FormControl;
  }

  get Duration(): FormControl {
    return this.createStgForm.get('duration') as FormControl;
  }
  create() {
    this.auth.createStage(this.data).subscribe((res: any) => {
      this.createStgForm.reset({
        code: '',
        type: 'default',
        duration: ''
      });
      this.alertService.success('Successfully', `A new stage has been created successfully`)
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
