import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EmployeeService } from './employee.service';
import { Employee } from '../../assignment1_comp3133_101356043/models/Employee.js'; // Adjust the path as needed

describe('EmployeeService', () => {
  let service: EmployeeService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:3000/api/employees';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmployeeService]
    });

    service = TestBed.inject(EmployeeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all employees', () => {
    const mockEmployees: Employee[] = [
      { id: '1', first_name: 'John', last_name: 'Doe', email: 'john@example.com', gender: 'Male', salary: 50000 },
      { id: '2', first_name: 'Jane', last_name: 'Doe', email: 'jane@example.com', gender: 'Female', salary: 60000 }
    ];

    service.getAllEmployees().subscribe(employees => {
      expect(employees.length).toBe(2);
      expect(employees).toEqual(mockEmployees);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockEmployees);
  });

  it('should fetch a single employee by id', () => {
    const mockEmployee: Employee = { id: '1', first_name: 'John', last_name: 'Doe', email: 'john@example.com', gender: 'Male', salary: 50000 };

    service.getEmployeeById('1').subscribe(employee => {
      expect(employee).toEqual(mockEmployee);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockEmployee);
  });

  it('should add a new employee', () => {
    const newEmployee: Employee = { id: '3', first_name: 'Alice', last_name: 'Smith', email: 'alice@example.com', gender: 'Female', salary: 70000 };

    service.addNewEmployee(newEmployee).subscribe(employee => {
      expect(employee).toEqual(newEmployee);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(newEmployee);
  });

  it('should update an existing employee', () => {
    const updatedEmployee: Employee = { id: '1', first_name: 'John', last_name: 'Doe', email: 'john@example.com', gender: 'Male', salary: 55000 };

    service.updateEmployeeById('1', updatedEmployee).subscribe(employee => {
      expect(employee).toEqual(updatedEmployee);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedEmployee);
  });

  it('should delete an employee', () => {
    service.deleteEmployeeById('1').subscribe((response) => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
