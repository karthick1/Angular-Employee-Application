import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { EmployeeModel } from '../model/employee.model';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  employeeModel: EmployeeModel;

  form: FormGroup;
  constructor(private fb: FormBuilder, private service: EmployeeService) {
    this.inputFieldValidation();
    this.fieldInitialization();
  }

  // Employee Input field validation
  inputFieldValidation(): void {
    this.form = this.fb.group({
      empId: [],
      name: ['', [Validators.required]],
      mobileNo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required]
    });
  }

  // Input field Initialization
  fieldInitialization(): void {
    this.form = new FormGroup({
      empId: new FormControl(),
      name: new FormControl(),
      email: new FormControl(),
      mobileNo: new FormControl(),
      address: new FormControl()
    });
  }

  ngOnInit() {
  }

  // Method for add employee
  addEmployee() {
    if (this.form.valid) {
      this.employeeModel = new EmployeeModel();
      this.employeeModel.empName = this.form.value.name;
      this.employeeModel.mobileNo = this.form.value.mobileNo;
      this.employeeModel.emailId = this.form.value.email;
      this.employeeModel.address = this.form.value.address;
      this.service.createEmployee(this.employeeModel)
        .subscribe(data => {
          this.form.reset()
          alert("Employee created successfully.");
        });
    }
  }

  // Reset form fields
  resetEmployee(): void {
    this.form.reset();
  }
}

