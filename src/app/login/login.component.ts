import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model: { username: string; password: string } = { username: '', password: '' };
  loading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.loading = true;
    this.authService.login(this.model.username, this.model.password)
      .subscribe({
        next: (data) => {
          this.loading = false;
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = 'Invalid username or password';
          console.error('There was an error!', error);
        }
      });
  }
}
