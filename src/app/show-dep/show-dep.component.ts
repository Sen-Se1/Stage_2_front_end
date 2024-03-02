import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { dialogBox } from './../utils/dialog-box';
import { SortTableService } from '../service/sort-table.service';
import { alert } from '../utils/alert';

@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrl: './show-dep.component.css'
})
export class ShowDepComponent {
  departments: any[] = [];
  searchValue: string = '';
  dialogBoxService: dialogBox;
  constructor(protected auth: AuthService, protected sortTableService: SortTableService) {
    this.dialogBoxService = new dialogBox();
    this.alertService = new alert();
  }
  alertService: alert;
  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.auth.getAllDep().subscribe((res: any) => {
        this.departments = res.data;
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
  dangerBox(id: any) {
    this.dialogBoxService.danger('Es-tu sûr ?', 'Si ce département est supprimé, tous les groupes, étudiants et devoirs qui lui sont associés seront supprimés.').subscribe(resp => {
      if (resp.success) {
        this.auth.deleteDep(id).subscribe((res: any) => {
          const index = this.departments.findIndex(department => department._id === id);
          // If the department is found, remove it from the array
          if (index !== -1) {
            this.alertService.success('Avec succès', `Le département a été supprimé avec succès pour le propriétaire du label: ${this.departments[index].libelle}`)
            this.departments.splice(index, 1);
          }
          // Check if the current page is greater than the total number of pages
          if (this.sortTableService.currentPage > this.getPageNumbers().length) {
            // If so, set the current page to previous page
            this.sortTableService.currentPage = this.getPageNumbers().length;
          }
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
    });
  }
  update(id: any) {
    this.auth.updateBtn("/update/department", id)
  }
  sortTable(key: string): void {
    this.departments = this.sortTableService.sort(
      this.departments,
      key
    );
  }
  getPaginatedData(): any[] {
    return this.sortTableService.paginate(this.departments);
  }

  onPageChange(pageNumber: number): void {
    this.sortTableService.currentPage = pageNumber;
  }

  getPageNumbers(): number[] {
    return this.sortTableService.getPageNumbers(this.departments);
  }
}
