import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { alert } from '../utils/alert';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(protected auth: AuthService) {
    this.alertService = new alert();
  }
  alertService: alert;
  results: { [key: string]: any } = [];
  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.auth.getAllDep().subscribe((res: any) => {
        this.results['département'] = res.result;
        this.auth.getAllGrp().subscribe((res: any) => {
          this.results['groupe'] = res.result;
          this.auth.getAllStu().subscribe((res: any) => {
            this.results['étudiant'] = res.result;
            this.auth.getAllStage().subscribe((res: any) => {
              this.results['stage'] = res.result;
              this.auth.getAllAss().subscribe((res: any) => {
                this.results['affectation'] = res.result;
                if (this.auth.userRole === 'ADMIN') {
                  this.auth.getAllModAdmin().subscribe((res: any) => {
                    this.results['admin'] = res.result.admins;
                    this.results['modérateur'] = res.result.moderators;
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
    }
  }
}
