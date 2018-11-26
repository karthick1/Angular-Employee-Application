import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';

@Component({
    selector: 'employee-delete-popup',
    templateUrl: './modal-popup.html'
})
export class EmployeeModal {
    closeResult: string;
    employeeId: string;
    constructor(private modalService: NgbModal, private service: EmployeeService, private router: Router) {
        this.service.currentEmployeeId.subscribe(employeeId => this.employeeId = employeeId)
    }

    open(content) {
        this.modalService.open(content, { ariaLabelledBy: 'modal-popup' }).result.then((result) => {
              this.service.deleteEmployee(this.employeeId)
              .subscribe(data => {
                this.router.navigate(['add-employee']);
              })
        }, (reason) => {
        });
    }

}