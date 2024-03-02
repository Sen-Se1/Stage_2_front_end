import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { dialogBox } from './../utils/dialog-box';
import { SortTableService } from '../service/sort-table.service';
import { alert } from '../utils/alert';

@Component({
  selector: 'app-show-etud',
  templateUrl: './show-etud.component.html',
  styleUrl: './show-etud.component.css'
})
export class ShowEtudComponent {
  dialogBoxService: dialogBox;
  students: any[] = [];
  searchValue: string = '';
  constructor(private auth: AuthService, protected sortTableService: SortTableService) {
    this.dialogBoxService = new dialogBox();
    this.alertService = new alert();
  }
  alertService: alert;
  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.auth.getAllStu().subscribe((res: any) => {
        this.students = res.data;
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
    this.dialogBoxService.danger('Es-tu sûr ?', 'Si cet élève est supprimé, tous les devoirs qui lui sont associés seront supprimés.').subscribe(resp => {
      if (resp.success) {
        this.auth.deleteStu(id).subscribe((res: any) => {
          const index = this.students.findIndex(student => student._id === id);
          // If the student is found, remove it from the array
          if (index !== -1) {
            this.alertService.success('Avec succès', `L'étudiant a supprimé avec succès pour le propriétaire du nom: ${this.students[index].nom} ${this.students[index].prenom}`)
            this.students.splice(index, 1);
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
    this.auth.updateBtn("/update/student", id)
  }
  sortTable(key: string): void {
    this.students = this.sortTableService.sort(this.students, key);
  }
  getPaginatedData(): any[] {
    return this.sortTableService.paginate(this.students);
  }

  onPageChange(pageNumber: number): void {
    this.sortTableService.currentPage = pageNumber;
  }

  getPageNumbers(): number[] {
    return this.sortTableService.getPageNumbers(this.students);
  }
}
