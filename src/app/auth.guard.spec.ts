import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authServiceMock: any;
  let routerMock: any;

  beforeEach(() => {
    authServiceMock = { isLoggedIn: jasmine.createSpy() };
    routerMock = { navigate: jasmine.createSpy() };

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    authGuard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should allow the authenticated user to access app', () => {
    authServiceMock.isLoggedIn.and.returnValue(true);
    expect(authGuard.canActivate()).toBe(true);
  });

  it('should redirect an unauthenticated user to the login route', () => {
    authServiceMock.isLoggedIn.and.returnValue(false);
    authGuard.canActivate();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login'], { queryParams: { returnUrl: undefined } });
  });
});
