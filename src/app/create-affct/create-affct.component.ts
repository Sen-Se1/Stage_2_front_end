import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import ObjectId  from 'bson-objectid';

import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { alert } from '../utils/alert';

@Component({
  selector: 'app-create-affct',
  templateUrl: './create-affct.component.html',
  styleUrl: './create-affct.component.css',
})
export class CreateAffctComponent {
  constructor(private auth: AuthService) {
    this.alertService = new alert();
  }
  alertService: alert;
  data = {
    cin: '',
    codeS: 'default',
    lieuS: '',
    codeRap: '',
    dateD: '',
    dateF: '',
  };
  stages: any[] = [];
  students: any[] = [];
  inputCinValue: any = "";
  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.auth.getAllStage().subscribe(
        (res: any) => {
          this.stages = res.data;
        },
        (err) => {
          if (err.status === 0) {
            return this.alertService.danger(
              'Problème système',
              'Nous avons un bug au niveau du serveur qui sera corrigé prochainement.'
            );
          }
          if (err.error.message) {
            return this.alertService.danger(
              err.error.status,
              err.error.message
            );
          }
          if (err.error.errors[0].msg) {
            return this.alertService.danger(
              err.statusText,
              err.error.errors[0].msg
            );
          }
        }
      );
      this.auth.getAllStu().subscribe(
        (res: any) => {
          this.students = res.data;
        },
        (err) => {
          if (err.status === 0) {
            return this.alertService.danger(
              'Problème système',
              'Nous avons un bug au niveau du serveur qui sera corrigé prochainement.'
            );
          }
          if (err.error.message) {
            return this.alertService.danger(
              err.error.status,
              err.error.message
            );
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
  createAssForm = new FormGroup({
    cin: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{8}$/),
    ]),
    codeS: new FormControl('', [Validators.required, this.AssignmentValidator]),
    lieuS: new FormControl('', [Validators.required]),
    codeRap: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern(/^[a-zA-Z0-9]+$/),
    ]),
    dateD: new FormControl('', [Validators.required, this.startDateValidator]),
    dateF: new FormControl('', [Validators.required, this.startDateValidator]),
  });
  AssignmentValidator(control: AbstractControl): ValidationErrors | null {
    if (control.value === 'default') {
      return { invalidCodeG: true };
    }
    return null;
  }
  startDateValidator(control: AbstractControl): ValidationErrors | null {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0
    if (new Date(control.value) <= today) {
      return { startDateInvalid: true };
    }
    return null;
  }
  onInputChange(event: any) {
    this.inputCinValue = event.target.value;
    if (this.inputCinValue.length === 8) {
      let found = false;
      for (const student of this.students) {
        if (student.cin === this.inputCinValue) {
          this.inputCinValue = student._id;
          found = true;
          break;
        }
      }
      if (!found) {
        this.inputCinValue = new ObjectId().toHexString();
      }
    }
  }

  get Cin(): FormControl {
    return this.createAssForm.get('cin') as FormControl;
  }

  get CodeS(): FormControl {
    return this.createAssForm.get('codeS') as FormControl;
  }

  get Location(): FormControl {
    return this.createAssForm.get('lieuS') as FormControl;
  }
  get CodeRap(): FormControl {
    return this.createAssForm.get('codeRap') as FormControl;
  }

  get DateD(): FormControl {
    return this.createAssForm.get('dateD') as FormControl;
  }

  get DateF(): FormControl {
    return this.createAssForm.get('dateF') as FormControl;
  }

  create() {
    let sendData = {
      cin: this.inputCinValue,
      codeS: this.data.codeS,
      lieuS: this.data.lieuS,
      codeRap: this.data.codeRap,
      dateD: this.data.dateD,
      dateF: this.data.dateF,
    }
    this.auth.createAss(sendData).subscribe(
      (res: any) => {
        this.createAssForm.reset({
          cin: '',
          codeS: 'default',
          lieuS: '',
          codeRap: '',
          dateD: '',
          dateF: '',
        });
        this.alertService.success(
          'Avec succès',
          `Une nouvelle affectation a été créée avec succès.`
        );
      },
      (err) => {
        if (err.status === 0) {
          return this.alertService.danger(
            'Problème système',
            'Nous avons un bug au niveau du serveur qui sera corrigé prochainement.'
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
