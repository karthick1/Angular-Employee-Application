import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { EmployeeModel } from '../model/employee.model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  rootUrl = 'http://localhost:8088/employee/';

  constructor(private http: HttpClient) {
  }

  // Method for create new employee 
  public createEmployee(employee) {
    return this.http.post<EmployeeModel>(this.rootUrl + 'save', employee);
  }

  // Method for get employee data from API
  getEmployee() {
    return this.http
      .get<any[]>(this.rootUrl + 'list')
      .pipe(map(data => data));
  }

  // Method for delete employee 
  public deleteEmployee(empId) {
    return this.http.delete(this.rootUrl + 'delete' + "/" + empId);
  }

  // Method for Update employee 
  public updateEmployee(employee) {
    return this.http.put<EmployeeModel>(this.rootUrl + 'update', employee);
  }

  // Passing data from delete employee
  private empId = new BehaviorSubject('');
  currentEmployeeId = this.empId.asObservable();

// Passing delete employee id
  changeMessage(message: string) {
    this.empId.next(message)
  }
}
