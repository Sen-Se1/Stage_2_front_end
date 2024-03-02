import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SortTableService {
  public sortKey: string = '';
  public reverse: boolean = false;
  public currentPage: number = 1;
  public itemsPerPage: number = 10;

  sort(array: any[], key: string): any[] {
    this.sortKey = key;
    this.reverse = !this.reverse;
    return this.sortArray(array, key, this.reverse);
  }

  private sortArray(array: any[], key: string, reverse: boolean): any[] {
    const order = reverse ? -1 : 1;
    return array.sort((a, b) => {
      const valueA = this.resolveNestedProperty(a, key);
      const valueB = this.resolveNestedProperty(b, key);

      if (this.isDate(valueA) && this.isDate(valueB)) {
        return (
          order * (new Date(valueA).getTime() - new Date(valueB).getTime())
        );
      } else if (typeof valueA === 'string' && typeof valueB === 'string') {
        return order * valueA.localeCompare(valueB);
      } else {
        return order * (valueA - valueB);
      }
    });
  }
  private resolveNestedProperty(obj: any, path: string): any {
    return path.split('.').reduce((o, key) => o[key], obj);
  }
  private isDate(value: any): boolean {
    return value instanceof Date || !isNaN(Date.parse(value));
  }
  isModMatch(mod: any, searchValue: string): boolean {
    return (
      mod._id.toLowerCase().includes(searchValue.toLowerCase()) ||
      mod.email.toLowerCase().includes(searchValue.toLowerCase()) ||
      mod.role.toLowerCase().includes(searchValue.toLowerCase()) ||
      mod.username.toLowerCase().includes(searchValue.toLowerCase())
    );
  }
  isDepartmentMatch(department: any, searchValue: string): boolean {
    return (
      department.codeD.toLowerCase().includes(searchValue.toLowerCase()) ||
      department.libelle.toLowerCase().includes(searchValue.toLowerCase())
    );
  }
  isGroupMatch(group: any, searchValue: string): boolean {
    return (
      group.codeG.toLowerCase().includes(searchValue.toLowerCase()) ||
      group.libelle.toLowerCase().includes(searchValue.toLowerCase()) ||
      group.codeD.libelle.toLowerCase().includes(searchValue.toLowerCase())
    );
  }
  isStudentMatch(student: any, searchValue: string): boolean {
    return (
      student.cin.toLowerCase().includes(searchValue.toLowerCase()) ||
      student.nom.toLowerCase().includes(searchValue.toLowerCase()) ||
      student.prenom.toLowerCase().includes(searchValue.toLowerCase()) ||
      student.email.toLowerCase().includes(searchValue.toLowerCase()) ||
      student.tel.toLowerCase().includes(searchValue.toLowerCase()) ||
      student.codeG.libelle.toLowerCase().includes(searchValue.toLowerCase())
    );
  }
  isStageMatch(stage: any, searchValue: string): boolean {
    return (
      stage.codeS.toLowerCase().includes(searchValue.toLowerCase()) ||
      stage.type.toLowerCase().includes(searchValue.toLowerCase()) ||
      stage.duree.toString().toLowerCase().includes(searchValue.toLowerCase())
    );
  }
  isAssignmentMatch(assignment: any, searchValue: string): boolean {
    return (
      assignment.cin.cin.toLowerCase().includes(searchValue.toLowerCase()) ||
      assignment.cin.nom.toLowerCase().includes(searchValue.toLowerCase()) ||
      assignment.cin.prenom.toLowerCase().includes(searchValue.toLowerCase()) ||
      assignment.codeS.codeS.toLowerCase().includes(searchValue.toLowerCase()) ||
      assignment.lieuS.toLowerCase().includes(searchValue.toLowerCase()) ||
      // assignment.codeRap.toLowerCase().includes(searchValue.toLowerCase()) ||
      assignment.dateD.toLowerCase().includes(searchValue.toLowerCase()) ||
      assignment.dateF.toLowerCase().includes(searchValue.toLowerCase())
    );
  }
  paginate(array: any[]): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, array.length);
    return array.slice(startIndex, endIndex);
  }
  getPageNumbers(array: any[]): number[] {
    const pageCount = Math.ceil(array.length / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }
}
