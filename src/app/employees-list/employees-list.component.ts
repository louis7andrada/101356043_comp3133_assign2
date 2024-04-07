import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../assignment1_comp3133_101356043/models/employee';
import { EmployeeService } from '../employee.service; // Update with your actual path

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (data: Employee[]) => {
        this.employees = data;
      },
      (err: any) => {
        console.error(err);
      }
    );
  }

  editEmployee(id: number): void {
    console.log('Edit employee with id:', id);
  }

  deleteEmployee(id: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe(
        () => {
          this.employees = this.employees.filter(employee => employee.id !== id);
        },
        (err: any) => {
          console.error(err);
        }
      );
    }
  }
}
