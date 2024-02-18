import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { alert } from '../utils/alert';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private auth: AuthService) {
    this.alertService = new alert();
  }
  alertService: alert;
  results: { [key: string]: any } = [];
  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.auth.getAllDep().subscribe((res: any) => {
        this.results['Department'] = res.result;
        this.auth.getAllGrp().subscribe((res: any) => {
          this.results['Group'] = res.result;
          this.auth.getAllStu().subscribe((res: any) => {
            this.results['Student'] = res.result;
            this.auth.getAllStage().subscribe((res: any) => {
              this.results['Stage'] = res.result;
              this.auth.getAllAss().subscribe((res: any) => {
                this.results['Assignment'] = res.result;
                if (this.auth.userRole === 'ADMIN') {
                  this.auth.getAllModAdmin().subscribe((res: any) => {
                    this.results['Admin'] = res.result.admins;
                    this.results['Moderator'] = res.result.moderators;
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
