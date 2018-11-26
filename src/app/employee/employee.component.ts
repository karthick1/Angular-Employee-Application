import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { EmployeeModel } from '../model/employee.model';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'employee-page',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  page: number = 1;
  employees: any;
  employeeModel: EmployeeModel;
  newMode: boolean;
  editMode: boolean;
  form: FormGroup;
  selectedEmpId: string;
  constructor(private fb: FormBuilder, private service: EmployeeService) {
    this.newMode = false;
    this.editMode = true;
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

  // Method for edit employee
  editEmployee(employee): void {
    this.newMode = true;
    this.editMode = false;
    this.form.get('empId').setValue(employee.empId);
    this.form.get('name').setValue(employee.empName);
    this.form.get('email').setValue(employee.emailId);
    this.form.get('mobileNo').setValue(employee.mobileNo);
    this.form.get('address').setValue(employee.address);
  }

  ngOnInit() {
    this.service.currentEmployeeId.subscribe(selectedEmpId => this.selectedEmpId = selectedEmpId)
    this.getEmployee();
  }

  // Method used to get employee list
  getEmployee() {
    this.service.getEmployee().subscribe(
      employees => {
        this.employees = employees;
        //console.log(employees);
      }
    )
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
          this.getEmployee();
        });
    }
  }
  
  // Method for delete selected employee
  deleteEmployee(empId: string): void {
    this.service.changeMessage(empId);
  };

  // Method for update employee
  updateEmployee(employee): void {
    this.employeeModel = new EmployeeModel();
    this.employeeModel.empId = this.form.value.empId;
    this.employeeModel.empName = this.form.value.name;
    this.employeeModel.mobileNo = this.form.value.mobileNo;
    this.employeeModel.emailId = this.form.value.email;
    this.employeeModel.address = this.form.value.address;
    this.service.updateEmployee(this.employeeModel)
      .subscribe(data => {
        this.getEmployee();
        this.resetEmployee();
        alert('Employee Updated successfully')
      })
  }

  // Reset form fields
  resetEmployee(): void {
    this.form.reset()
    this.newMode = false;
    this.editMode = true;
  }

}


