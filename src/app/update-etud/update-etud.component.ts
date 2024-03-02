import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { alert } from '../utils/alert';

@Component({
  selector: 'app-update-etud',
  templateUrl: './update-etud.component.html',
  styleUrl: './update-etud.component.css'
})
export class UpdateEtudComponent {
  constructor(private auth: AuthService, private route: ActivatedRoute) {
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
  idEtud = ''
  ngOnInit(): void {
    if (this.auth.isAdminMod()) {
      this.route.params.subscribe(params => {
        this.idEtud = params['id']; // Retrieve the ID from the route parameters
        this.auth.getByIdStu(this.idEtud).subscribe((res: any) => {
          this.data = {
            cin: res.data.cin,
            nom: res.data.nom,
            prenom: res.data.prenom,
            email: res.data.email,
            tel: res.data.tel,
            codeG: res.data.codeG._id
          }
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
        })
      });
    }
  }
  updateStdForm = new FormGroup({
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
    return this.updateStdForm.get('cin') as FormControl;
  }

  get Nom(): FormControl {
    return this.updateStdForm.get('nom') as FormControl;
  }

  get Prenom(): FormControl {
    return this.updateStdForm.get('prenom') as FormControl;
  }
  get Email(): FormControl {
    return this.updateStdForm.get('email') as FormControl;
  }

  get Tel(): FormControl {
    return this.updateStdForm.get('tel') as FormControl;
  }

  get CodeG(): FormControl {
    return this.updateStdForm.get('codeG') as FormControl;
  }

  update() {
    this.auth.updateStu(this.idEtud, this.data).subscribe((res: any) => {
      this.alertService.success('Avec succès', `L'étudiant a été mis à jour avec succès pour le propriétaire du nom: ${res.data.nom} ${res.data.prenom}`)
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
