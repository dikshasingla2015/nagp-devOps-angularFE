import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DemoService } from './service/demo.service';
import { Employee } from './models/employee.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  employees: Employee[] = [];

  addEmployeeForm!: FormGroup;
  employeeNameControl!: FormControl;
  ageControl!: FormControl;
  designationControl!: FormControl;

  constructor(private demoService: DemoService) { }

  ngOnInit(): void {
    this.employeeNameControl = new FormControl('', [Validators.required]);
    this.ageControl = new FormControl('', [Validators.required]);
    this.designationControl = new FormControl('', [Validators.required]);

    this.addEmployeeForm = new FormGroup({
      employeeName: this.employeeNameControl,
      age: this.ageControl,
      designation: this.designationControl,
    });

    this.getAllEmployeesDetails();
  }

  getAllEmployeesDetails() {
    this.demoService.getAllEmployees().then((response: any) => {
      if (response.code == '200') {
        this.employees = response.data as Employee[];
      } else {
        alert(response.errorMessage);
      }
    }).catch((error) => {
      alert("No employee data Found");
    });
  }

  onAddEmployeeSubmit(): void {
    const employee: Employee = this.addEmployeeForm.value as Employee;
    this.demoService.addEmployee(employee).then(
      (response: any) => {
        if (response.code == '200') {
          alert(response.data)
          this.getAllEmployeesDetails();
        } else {
          alert(response.errorMessage);
        }
        this.addEmployeeForm.reset();
      }).catch((error) => {
        alert('Error Adding Employee details.');
        this.addEmployeeForm.reset();
      });
  }

  getControlValidationClasses(control: FormControl): any {
    return {
      'is-invalid': control.touched && control.invalid,
      'is-valid': control.touched && control.valid
    };
  }

}
