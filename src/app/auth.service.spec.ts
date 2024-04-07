import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;
  const apiUrl = 'http://localhost:3000/api';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Verify that no unmatched requests are outstanding.
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('login should return true for valid credentials', () => {
    const mockUser = { username: 'test', password: 'test123' };
    const mockResponse = { token: 'fake-jwt-token' };

    authService.login(mockUser.username, mockUser.password).subscribe(isLoggedIn => {
      expect(isLoggedIn).toBe(true);
    });

    const req = httpTestingController.expectOne(`${apiUrl}/login`);
    expect(req.request.method).toEqual('POST');
    req.flush(mockResponse); // Simulate a network response
  });

  it('login should return false for invalid credentials', () => {
    const mockUser = { username: 'test', password: 'wrong' };

    authService.login(mockUser.username, mockUser.password).subscribe(isLoggedIn => {
      expect(isLoggedIn).toBe(false);
    });

    const req = httpTestingController.expectOne(`${apiUrl}/login`);
    expect(req.request.method).toEqual('POST');
    req.flush(null, { status: 401, statusText: 'Unauthorized' }); // Simulate a network error response
  });

  it('should remove token on logout', () => {
    localStorage.setItem('auth_token', 'fake-jwt-token');
    authService.logout();
    expect(localStorage.getItem('auth_token')).toBeNull();
  });

  it('isLoggedIn should return true if token exists', () => {
    localStorage.setItem('auth_token', 'fake-jwt-token');
    expect(authService.isLoggedIn()).toBe(true);
  });

  it('isLoggedIn should return false if token does not exist', () => {
    localStorage.removeItem('auth_token');
    expect(authService.isLoggedIn()).toBe(false);
  });
});
