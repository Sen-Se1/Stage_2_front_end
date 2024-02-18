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
  isDepartmentOpen = false;
  isGroupOpen = false;
  isStudentOpen = false;
  isStageOpen = false;
  isAssignmentOpen = false;
  isModeratorOpen = false;
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

      if (savedValueDepartment !== null) {
        this.isDepartmentOpen = JSON.parse(savedValueDepartment);
      }
      if (savedGroup !== null) {
        this.isGroupOpen = JSON.parse(savedGroup);
      }
      if (savedValueStudent !== null) {
        this.isStudentOpen = JSON.parse(savedValueStudent);
      }
      if (savedValueStage !== null) {
        this.isStageOpen = JSON.parse(savedValueStage);
      }
      if (savedValueAssignment !== null) {
        this.isAssignmentOpen = JSON.parse(savedValueAssignment);
      }
    }
  }
  toggleDepartmentCollapse() {
    this.isDepartmentOpen = !this.isDepartmentOpen;
    sessionStorage.setItem('isDepartmentOpen', JSON.stringify(this.isDepartmentOpen));
    // sessionStorage.setItem('isGroupOpen', JSON.stringify(this.isGroupOpen));
    // sessionStorage.setItem('isStudentOpen', JSON.stringify(this.isStudentOpen));
    // sessionStorage.setItem('isStageOpen', JSON.stringify(this.isStageOpen));
    // sessionStorage.setItem('isAssignmentOpen', JSON.stringify(this.isAssignmentOpen));
  }
  toggleGroupCollapse() {
    this.isGroupOpen = !this.isGroupOpen;
    sessionStorage.setItem('isGroupOpen', JSON.stringify(this.isGroupOpen));
    // sessionStorage.setItem('isDepartmentOpen', JSON.stringify(this.isDepartmentOpen));
    // sessionStorage.setItem('isStudentOpen', JSON.stringify(this.isStudentOpen));
    // sessionStorage.setItem('isStageOpen', JSON.stringify(this.isStageOpen));
    // sessionStorage.setItem('isAssignmentOpen', JSON.stringify(this.isAssignmentOpen));
  }
  toggleStudentCollapse() {
    this.isStudentOpen = !this.isStudentOpen;
    sessionStorage.setItem('isStudentOpen', JSON.stringify(this.isStudentOpen));
  }
  toggleStageCollapse() {
    this.isStageOpen = !this.isStageOpen;
    sessionStorage.setItem('isStageOpen', JSON.stringify(this.isStageOpen));
  }
  toggleAssignmentCollapse() {
    this.isAssignmentOpen = !this.isAssignmentOpen;
    sessionStorage.setItem('isAssignmentOpen', JSON.stringify(this.isAssignmentOpen));
  }
  toggleModeratorCollapse() {
    this.isModeratorOpen = !this.isModeratorOpen;
    sessionStorage.setItem('isModeratorOpen', JSON.stringify(this.isModeratorOpen));
  }
  // toggleDepartmentValue() {
  //   sessionStorage.setItem('isGroupOpen', JSON.stringify(!this.isGroupOpen));
  //   sessionStorage.setItem('isStudentOpen', JSON.stringify(!this.isStudentOpen));
  //   sessionStorage.setItem('isStageOpen', JSON.stringify(!this.isStageOpen));
  //   sessionStorage.setItem('isAssignmentOpen', JSON.stringify(!this.isAssignmentOpen));
  // }
  // toggleGroupValue() {
  //   sessionStorage.setItem('isDepartmentOpen', JSON.stringify(!this.isDepartmentOpen));
  //   sessionStorage.setItem('isStudentOpen', JSON.stringify(!this.isStudentOpen));
  //   sessionStorage.setItem('isStageOpen', JSON.stringify(!this.isStageOpen));
  //   sessionStorage.setItem('isAssignmentOpen', JSON.stringify(!this.isAssignmentOpen));
  // }
}
