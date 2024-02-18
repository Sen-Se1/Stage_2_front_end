import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { dialogBox } from './../utils/dialog-box';
import { SortTableService } from '../service/sort-table.service';
import { alert } from '../utils/alert';

@Component({
  selector: 'app-show-grp',
  templateUrl: './show-grp.component.html',
  styleUrl: './show-grp.component.css'
})
export class ShowGrpComponent {
  groups: any[] = [];
  searchValue: string = '';
  dialogBoxService: dialogBox;
  constructor(private auth: AuthService, protected sortTableService: SortTableService) {
    this.dialogBoxService = new dialogBox();
    this.alertService = new alert();
  }
  alertService: alert;
  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.auth.getAllGrp().subscribe((res: any) => {
        this.groups = res.data;
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
  dangerBox(id: any) {
    this.dialogBoxService.danger('Are you sure ?', 'If this group is deleted, all students and assignments associated with it will be deleted').subscribe(resp => {
      if (resp.success) {
        this.auth.deleteGrp(id).subscribe((res: any) => {
          const index = this.groups.findIndex(group => group._id === id);
          // If the group is found, remove it from the array
          if (index !== -1) {
            this.alertService.success('Successfully', `The group has been deleted successfully for the owner of the label: ${this.groups[index].libelle}`)
            this.groups.splice(index, 1);
          }
          // Check if the current page is greater than the total number of pages
          if (this.sortTableService.currentPage > this.getPageNumbers().length) {
            // If so, set the current page to previous page
            this.sortTableService.currentPage = this.getPageNumbers().length;
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
      }
    });
  }
  update(id: any) {
    this.auth.updateBtn("/update/group", id)
  }
  sortTable(key: string): void {
    this.groups = this.sortTableService.sort(this.groups, key);
  }
  getPaginatedData(): any[] {
    return this.sortTableService.paginate(this.groups);
  }

  onPageChange(pageNumber: number): void {
    this.sortTableService.currentPage = pageNumber;
  }

  getPageNumbers(): number[] {
    return this.sortTableService.getPageNumbers(this.groups);
  }
}
