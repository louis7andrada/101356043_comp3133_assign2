// Import necessary Angular modules and components
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { AuthGuard } from './auth.guard';

// Define the application routes
export const AppRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'employees', component: EmployeesListComponent, canActivate: [AuthGuard] },
  { path: 'employees/:id', component: EmployeeDetailsComponent, canActivate: [AuthGuard] },
  { path: 'edit-employee/:id', component: EmployeeEditComponent, canActivate: [AuthGuard] },
];
