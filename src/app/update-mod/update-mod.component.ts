import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { alert } from '../utils/alert';

@Component({
  selector: 'app-update-mod',
  templateUrl: './update-mod.component.html',
  styleUrl: './update-mod.component.css'
})
export class UpdateModComponent {
  constructor(private auth: AuthService, private route: ActivatedRoute) {
    this.alertService = new alert();
  }
  alertService: alert;
  data = {
    id: '',
    username: '',
    email: '',
    role: 'default'
  }
  idModAdmin = ''
  ngOnInit(): void {
    if (this.auth.isAdminMod()) {
      this.route.params.subscribe(params => {
        this.idModAdmin = params['id']; // Retrieve the ID from the route parameters        
        this.auth.getByIdModAdmin(this.idModAdmin).subscribe((res: any) => {
          this.data = {
            id: res.data._id,
            username: res.data.username,
            email: res.data.email,
            role: this.auth.convertToTitleCase(res.data.role)
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
  update() {
    this.auth.updateModAdmin(this.data.id, this.data).subscribe((res: any) => {
      this.alertService.success('Successfully', `The moderator has been updated successfully for the owner of the username: ${res.data.username}`)
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
  changePwd(id: any) {
    this.auth.updateBtn("/update/admins-and-mods/password/", id)
  }
  updateModForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9]+$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl('', [Validators.required, this.ModValidator]),
  });
  ModValidator(control: AbstractControl): ValidationErrors | null {
    if (control.value === 'default') {
      return { invalidRole: true };
    }
    return null;
  }
  get Username(): FormControl {
    return this.updateModForm.get('username') as FormControl;
  }

  get Email(): FormControl {
    return this.updateModForm.get('email') as FormControl;
  }

  get Role(): FormControl {
    return this.updateModForm.get('role') as FormControl;
  }
}
