import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { alert } from '../utils/alert';

@Component({
  selector: 'app-create-etud',
  templateUrl: './create-etud.component.html',
  styleUrl: './create-etud.component.css'
})
export class CreateEtudComponent {
  constructor(private auth: AuthService) {
    this.alertService = new alert();
  }
  alertService: alert;
  data = {
    cin: '',
    nom: '',
    prenom: '',
    email: '',
    tel: '',
    codeG: 'default'
  }
  groups: any[] = [];

  ngOnInit(): void {
    if (this.auth.isAdminMod()) {
      this.auth.getAllGrp().subscribe((res: any) => {
        this.groups = res.data;
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
  createStdForm = new FormGroup({
    cin: new FormControl('', [Validators.required, Validators.pattern(/^(0\d{7}|[1-9]\d{7})$/)]),
    nom: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]),
    prenom: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    tel: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]),
    codeG: new FormControl('', [Validators.required, this.StudentValidator])
  });
  StudentValidator(control: AbstractControl): ValidationErrors | null {
    if (control.value === 'default') {
      return { invalidCodeG: true };
    }
    return null;
  }

  get Cin(): FormControl {
    return this.createStdForm.get('cin') as FormControl;
  }

  get Nom(): FormControl {
    return this.createStdForm.get('nom') as FormControl;
  }

  get Prenom(): FormControl {
    return this.createStdForm.get('prenom') as FormControl;
  }
  get Email(): FormControl {
    return this.createStdForm.get('email') as FormControl;
  }

  get Tel(): FormControl {
    return this.createStdForm.get('tel') as FormControl;
  }

  get CodeG(): FormControl {
    return this.createStdForm.get('codeG') as FormControl;
  }

  create() {
    this.auth.createStu(this.data).subscribe((res: any) => {
      this.createStdForm.reset({
        cin: '',
        nom: '',
        prenom: '',
        email: '',
        tel: '',
        codeG: 'default'
      });
      this.alertService.success('Avec succès', `Un nouvel étudiant a été créé avec succès.`)
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
