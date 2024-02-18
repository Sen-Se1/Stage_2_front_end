import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { alert } from '../utils/alert';

@Component({
  selector: 'app-create-stud-by-file',
  templateUrl: './create-stud-by-file.component.html',
  styleUrl: './create-stud-by-file.component.css',
})
export class CreateStudByFileComponent {
  constructor(private auth: AuthService) {
    this.alertService = new alert();
  }
  alertService: alert;
  file: any;

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
    }
  }
  createStdForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
  });

  get File(): FormControl {
    return this.createStdForm.get('file') as FormControl;
  }
  getFile(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  create() {
    let formData = new FormData();
    formData.append('file', this.file);
    this.auth.createStuByFile(formData).subscribe(
      (res: any) => {
        this.createStdForm.reset({
          file: '',
        });
        this.alertService.success(
          'Successfully',
          `A new students has been created successfully`
        );
      },
      (err) => {
        if (err.status === 0) {
          return this.alertService.danger(
            'System glitch',
            'We have a server-level bug that will be fixed shortly'
          );
        }
        if (err.error.message) {
          return this.alertService.danger(err.error.status, err.error.message);
        }
        if (err.error.errors[0].msg) {
          return this.alertService.danger(
            err.statusText,
            err.error.errors[0].msg
          );
        }
      }
    );
  }
}
