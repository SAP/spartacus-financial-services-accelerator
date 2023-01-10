import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RoutingService } from '@spartacus/core';
import { ApplicationConfirmationGuard } from './application-confirmation.guard';

class MockRoutingService {
  go() {}
}

describe(`ApplicationConfirmationGuard`, () => {
  let guard: ApplicationConfirmationGuard;
  let routing: RoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
      ],
      imports: [RouterTestingModule],
    });

    guard = TestBed.inject(ApplicationConfirmationGuard);
    routing = TestBed.inject(RoutingService);

    spyOn(routing, 'go').and.stub();
  });

  it(`should redirect to homepage when application checkout is not active `, () => {
    localStorage.setItem('applicationConfirmation', 'false');
    guard.canActivate();
    expect(routing.go).toHaveBeenCalled();
  });

  it(`should not redirect to the homepage when application checkout is active `, () => {
    localStorage.setItem('applicationConfirmation', 'true');
    guard.canActivate();
    expect(routing.go).not.toHaveBeenCalled();
  });
});
