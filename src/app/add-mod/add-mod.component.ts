import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { alert } from '../utils/alert';

@Component({
  selector: 'app-add-mod',
  templateUrl: './add-mod.component.html',
  styleUrl: './add-mod.component.css'
})
export class AddModComponent {
  constructor(private auth: AuthService) {
    this.alertService = new alert();
  }
  ngOnInit(): void {
    if (this.auth.isAdminMod()) { return }
  }
  alertService: alert;
  data = {
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    role: 'default',
  }
  create() {
    this.auth.createModAdmin(this.data).subscribe((res: any) => {
      this.createModForm.reset({
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
        role: 'default',
      });
      this.alertService.success('Successfully', `A new moderator has been created successfully`)
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
  createModForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9]+$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(8)]),
    role: new FormControl('', [Validators.required, this.ModValidator]),
  });
  ModValidator(control: AbstractControl): ValidationErrors | null {
    if (control.value === 'default') {
      return { invalidRole: true };
    }
    return null;
  }
  get Username(): FormControl {
    return this.createModForm.get('username') as FormControl;
  }

  get Email(): FormControl {
    return this.createModForm.get('email') as FormControl;
  }

  get Password(): FormControl {
    return this.createModForm.get('password') as FormControl;
  }
  get PasswordConfirm(): FormControl {
    return this.createModForm.get('passwordConfirm') as FormControl;
  }

  get Role(): FormControl {
    return this.createModForm.get('role') as FormControl;
  }
}
