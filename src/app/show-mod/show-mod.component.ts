import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { dialogBox } from './../utils/dialog-box';
import { SortTableService } from '../service/sort-table.service';
import { alert } from '../utils/alert';

@Component({
  selector: 'app-show-mod',
  templateUrl: './show-mod.component.html',
  styleUrl: './show-mod.component.css'
})
export class ShowModComponent {
  dialogBoxService: dialogBox;
  mods: any[] = [];
  searchValue: string = '';
  constructor(private auth: AuthService, protected sortTableService: SortTableService) {
    this.dialogBoxService = new dialogBox();
    this.alertService = new alert();
  }
  alertService: alert;
  ngOnInit() {
    if (this.auth.isAdminMod()) {
      this.auth.getAllModAdmin().subscribe((res: any) => {
        this.mods = res.data.moderators;
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
    this.dialogBoxService.danger('Are you sure ?', 'Do you want to delete this moderator ?').subscribe(resp => {
      if (resp.success) {
        this.auth.deleteModAdmin(id).subscribe((res: any) => {
          const index = this.mods.findIndex(mod => mod._id === id);
          // If the admin or moderator is found, remove it from the array
          if (index !== -1) {
            this.alertService.success('Successfully', `The moderator has been deleted successfully for the owner of the username: ${this.mods[index].username}`)
            this.mods.splice(index, 1);
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
    this.auth.updateBtn("/update/admins-and-mods/", id)
  }
  sortTable(key: string): void {
    this.mods = this.sortTableService.sort(this.mods, key);
  }
  getPaginatedData(): any[] {
    return this.sortTableService.paginate(this.mods);
  }

  onPageChange(pageNumber: number): void {
    this.sortTableService.currentPage = pageNumber;
  }

  getPageNumbers(): number[] {
    return this.sortTableService.getPageNumbers(this.mods);
  }
}
