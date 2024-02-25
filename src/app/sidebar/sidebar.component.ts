import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { alert } from '../utils/alert';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(protected auth: AuthService) {
    this.alertService = new alert();
  }
  alertService: alert;
  loggedIn !: string
  protected isAdmin = true;
  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.auth.profile(this.auth.idFormToken()).subscribe((res: any) => {
        this.loggedIn = res.data.username;
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
      const savedValueDepartment = sessionStorage.getItem('isDepartmentOpen');
      const savedGroup = sessionStorage.getItem('isGroupOpen');
      const savedValueStudent = sessionStorage.getItem('isStudentOpen');
      const savedValueStage = sessionStorage.getItem('isStageOpen');
      const savedValueAssignment = sessionStorage.getItem('isAssignmentOpen');

      
    }
  }
 
}
