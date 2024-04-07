import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:3000/api'; // Adjust the API URL as needed
  private isLoggedInStatus = false;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        tap(response => {
          localStorage.setItem('auth_token', response.token);
          this.isLoggedInStatus = true;
        }),
        map(response => !!response.token),
        catchError(error => {
          console.error('Login error:', error);
          return of(false);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    this.isLoggedInStatus = false;
  }

  isLoggedIn(): boolean {
    return this.isLoggedInStatus || !!localStorage.getItem('auth_token');
  }
}
