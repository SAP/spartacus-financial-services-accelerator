import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavigationExtras } from '@angular/router';

import { RoutingService } from '@spartacus/core';

import { of } from 'rxjs';

import { AuthService } from '../facade/auth.service';
import { UserToken } from '../models/token-types.model';

import { NotAuthGuard } from './not-auth.guard';

const mockUserToken = {
  access_token: 'Mock Access Token',
  token_type: 'test',
  refresh_token: 'test',
  expires_in: 1,
  scope: ['test'],
  userId: 'test'
};

class AuthServiceStub {
  userToken$ = of();
}

class RoutingServiceStub {
  go(_path: any[], _query?: object, _extras?: NavigationExtras) {}
}

describe('NotAuthGuard', () => {
  let authGuard: NotAuthGuard;
  let authService: AuthServiceStub;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NotAuthGuard,
        { provide: RoutingService, useClass: RoutingServiceStub },
        { provide: AuthService, useClass: AuthServiceStub }
      ],
      imports: [RouterTestingModule]
    });
    authService = TestBed.get(AuthService);
    authGuard = TestBed.get(NotAuthGuard);
  });

  it('should return false', () => {
    authService.userToken$ = of(mockUserToken);

    let result: boolean;
    const subscription = authGuard
      .canActivate()
      .subscribe(value => (result = value));
    subscription.unsubscribe();

    expect(result).toBe(false);
  });

  it('should return true', () => {
    authService.userToken$ = of({ access_token: undefined } as UserToken);

    let result: boolean;
    const subscription = authGuard
      .canActivate()
      .subscribe(value => (result = value));
    subscription.unsubscribe();

    expect(result).toBe(true);
  });
});
