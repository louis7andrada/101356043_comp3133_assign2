import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Employee } from '../../../assignment1_comp3133_101356043/models/Employee.js';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent implements OnInit {
  editForm: FormGroup;
  employeeId: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {
    this.editForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      salary: ['', [Validators.required, Validators.pattern(/^\d+$/)]]
    });
  }

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id') || '';
    if (this.employeeId) {
      this.employeeService.getEmployeeById(this.employeeId).subscribe((employee: Employee) => {
        this.editForm.patchValue(employee);
      });
    }
  }

  onSubmit(): void {
    if (this.editForm.valid && this.employeeId) {
      this.employeeService.updateEmployeeById(this.employeeId, this.editForm.value).subscribe(() => {
        this.router.navigate(['/employees']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/employees']);
  }
}
