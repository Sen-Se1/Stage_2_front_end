import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { dialogBox } from './../utils/dialog-box';
import { SortTableService } from '../service/sort-table.service';
import { alert } from '../utils/alert';

@Component({
  selector: 'app-show-affct',
  templateUrl: './show-affct.component.html',
  styleUrl: './show-affct.component.css'
})
export class ShowAffctComponent {
  dialogBoxService: dialogBox;
  assignments: any[] = [];
  searchValue: string = '';
  constructor(private auth: AuthService, protected sortTableService: SortTableService) {
    this.dialogBoxService = new dialogBox();
    this.alertService = new alert();
  }
  alertService: alert;
  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.auth.getAllAss().subscribe((res: any) => {
        this.assignments = res.data;
        this.assignments.forEach((ass) => {
          const dateDebut = new Date(ass.dateD)
          const dateFin = new Date(ass.dateF)
          ass.dateD = dateDebut.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
          });
          ass.dateF = dateFin.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
          });
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
    }
  }
  dangerBox(id: any) {
    this.dialogBoxService.danger('Are you sure ?', 'Do you want to delete this assignment ?').subscribe(resp => {
      if (resp.success) {
        this.auth.deleteAss(id).subscribe((res: any) => {
          const index = this.assignments.findIndex(assignment => assignment._id === id);
          // If the student is found, remove it from the array
          if (index !== -1) {
            this.alertService.success('Successfully', `The assignment has been deleted successfully for the owner of the cin: ${this.assignments[index].cin.cin}`)
            this.assignments.splice(index, 1);
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
    this.auth.updateBtn("/update/assignment", id)
  }
  sortTable(key: string): void {
    this.assignments = this.sortTableService.sort(
      this.assignments,
      key
    );
  }
  getPaginatedData(): any[] {
    return this.sortTableService.paginate(this.assignments);
  }

  onPageChange(pageNumber: number): void {
    this.sortTableService.currentPage = pageNumber;
  }

  getPageNumbers(): number[] {
    return this.sortTableService.getPageNumbers(this.assignments);
  }
}

