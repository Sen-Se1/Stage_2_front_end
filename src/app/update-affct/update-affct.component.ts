import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { alert } from '../utils/alert';
import ObjectId from 'bson-objectid';

@Component({
  selector: 'app-update-affct',
  templateUrl: './update-affct.component.html',
  styleUrl: './update-affct.component.css'
})
export class UpdateAffctComponent {
  constructor(private auth: AuthService, private route: ActivatedRoute) {
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
  }
  students: any[] = [];
  stages: any[] = [];
  idAffct = ''
  inputCinValue!: any;

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.route.params.subscribe(params => {
        this.idAffct = params['id']; // Retrieve the ID from the route parameters
      });
      this.auth.getByIdAss(this.idAffct).subscribe((res: any) => {
        this.data = {
          cin: res.data.cin.cin,
          codeS: res.data.codeS._id,
          lieuS: res.data.lieuS,
          codeRap: res.data.codeRap,
          dateD: new Date(res.data.dateD).toISOString().split('T')[0],
          dateF: new Date(res.data.dateF).toISOString().split('T')[0],
        }
        this.inputCinValue = res.data.cin._id;
      }, err => {
        if (err.status === 0) {
          return this.alertService.danger("Problème système", "Nous avons un bug au niveau du serveur qui sera corrigé prochainement.");
        }
        if (err.error.message) {
          return this.alertService.danger(err.error.status, err.error.message);
        }
        if (err.error.errors[0].msg) {
          return this.alertService.danger(err.statusText, err.error.errors[0].msg);
        }
      });
      this.auth.getAllStu().subscribe((res: any) => {
        this.students = res.data;
        this.auth.getAllStage().subscribe((res: any) => {
          this.stages = res.data;
        }, err => {
          if (err.status === 0) {
            return this.alertService.danger("Problème système", "Nous avons un bug au niveau du serveur qui sera corrigé prochainement.");
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
          return this.alertService.danger("Problème système", "Nous avons un bug au niveau du serveur qui sera corrigé prochainement.");
        }
        if (err.error.message) {
          return this.alertService.danger(err.error.status, err.error.message);
        }
        if (err.error.errors[0].msg) {
          return this.alertService.danger(err.statusText, err.error.errors[0].msg);
        }
      });
    }
  }
  onInputChange(event: any) {
    this.inputCinValue = event.target.value;
    if ( this.inputCinValue.length === 8 ){
      for (const student of this.students) {
        if (student.cin === this.inputCinValue) {
          this.inputCinValue = student._id;
          break;
        } 
        this.inputCinValue = new ObjectId().toHexString();
      }
    }
  }

  updateAssForm = new FormGroup({
    cin: new FormControl('', [Validators.required, Validators.pattern(/^\d{8}$/),]),
    codeS: new FormControl('', [Validators.required, this.AssignmentValidator]),
    lieuS: new FormControl('', [Validators.required]),
    codeRap: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9]+$/)]),
    dateD: new FormControl('', [Validators.required, this.startDateValidator]),
    dateF: new FormControl('', [Validators.required, this.startDateValidator])
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


  get Cin(): FormControl {
    return this.updateAssForm.get('cin') as FormControl;
  }

  get CodeS(): FormControl {
    return this.updateAssForm.get('codeS') as FormControl;
  }

  get Location(): FormControl {
    return this.updateAssForm.get('lieuS') as FormControl;
  }
  get CodeRap(): FormControl {
    return this.updateAssForm.get('codeRap') as FormControl;
  }

  get DateD(): FormControl {
    return this.updateAssForm.get('dateD') as FormControl;
  }

  get DateF(): FormControl {
    return this.updateAssForm.get('dateF') as FormControl;
  }

  update() {
    let sendData = {
      cin: this.inputCinValue,
      codeS: this.data.codeS,
      lieuS: this.data.lieuS,
      codeRap: this.data.codeRap,
      dateD: this.data.dateD,
      dateF: this.data.dateF,
    }
    this.auth.updateAss(this.idAffct, sendData).subscribe((res: any) => {
      this.alertService.success('Avec succès', `L'affectation a été mise à jour avec succès.`)
    }, err => {
      if (err.status === 0) {
        return this.alertService.danger("Problème système", "Nous avons un bug au niveau du serveur qui sera corrigé prochainement.");
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
