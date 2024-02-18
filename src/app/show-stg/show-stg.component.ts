import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { dialogBox } from './../utils/dialog-box';
import { SortTableService } from '../service/sort-table.service';
import { alert } from '../utils/alert';

@Component({
  selector: 'app-show-stg',
  templateUrl: './show-stg.component.html',
  styleUrl: './show-stg.component.css'
})
export class ShowStgComponent {
  stages: any[] = [];
  searchValue: string = '';
  dialogBoxService: dialogBox;
  constructor(private auth: AuthService, protected sortTableService: SortTableService) {
    this.dialogBoxService = new dialogBox();
    this.alertService = new alert();
  }
  alertService: alert;
  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.auth.getAllStage().subscribe((res: any) => {
        this.stages = res.data;
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
    this.dialogBoxService.danger('Are you sure ?', 'If this stage is deleted, all assignments associated with it will be deleted').subscribe(resp => {
      if (resp.success) {
        this.auth.deleteStage(id).subscribe((res: any) => {
          const index = this.stages.findIndex(stage => stage._id === id);
          // If the stage is found, remove it from the array
          if (index !== -1) {
            this.alertService.success('Successfully', `The stage has been deleted successfully for the owner of the code: ${this.stages[index].codeS}`)
            this.stages.splice(index, 1);
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
    this.auth.updateBtn("/update/stage", id)
  }
  sortTable(key: string): void {
    this.stages = this.sortTableService.sort(this.stages, key);
  }
  getPaginatedData(): any[] {
    return this.sortTableService.paginate(this.stages);
  }

  onPageChange(pageNumber: number): void {
    this.sortTableService.currentPage = pageNumber;
  }

  getPageNumbers(): number[] {
    return this.sortTableService.getPageNumbers(this.stages);
  }
}
