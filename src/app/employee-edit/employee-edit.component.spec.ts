import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeEditComponent } from './employee-edit.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { of } from 'rxjs';

describe('EmployeeEditComponent', () => {
  let component: EmployeeEditComponent;
  let fixture: ComponentFixture<EmployeeEditComponent>;
  let mockEmployeeService;
  let mockRouter;
  let mockActivatedRoute;

  beforeEach(async () => {
    // Mock the dependencies
    mockEmployeeService = jasmine.createSpyObj('EmployeeService', ['getEmployeeById', 'updateEmployeeById']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockActivatedRoute = { snapshot: { paramMap: convertToParamMap({ id: '123' }) } };

    await TestBed.configureTestingModule({
      declarations: [EmployeeEditComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: EmployeeService, useValue: mockEmployeeService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeEditComponent);
    component = fixture.componentInstance;
    mockEmployeeService.getEmployeeById.and.returnValue(of({
      id: '123',
      first_name: 'Test',
      last_name: 'User',
      email: 'test@example.com',
      gender: 'Other',
      salary: 50000
    }));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getEmployeeById on init', () => {
    expect(mockEmployeeService.getEmployeeById).toHaveBeenCalledWith('123');
  });

  it('should navigate to the "employees" route on cancel', () => {
    component.cancel();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/employees']);
  });

});
