import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RoutingService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { ChangeRequestStatus } from './../../../occ/occ-models/occ.models';
import { ChangeRequestService } from './../facade/change-request.service';
import { ChangeRequestSubmissionGuard } from './change-request-submission.guard';

const mockChangeRequest = {
  requestId: 'requestId',
  requestStatus: ChangeRequestStatus.SUBMITTED,
  insurancePolicy: {
    categoryData: {
      code: 'test_category',
    },
  },
};

class MockRoutingService {
  go() {}
}

class MockChangeRequestService {
  getChangeRequest(): Observable<any> {
    return of({});
  }
}

describe(`ChangeRequestSubmissionGuard`, () => {
  let guard: ChangeRequestSubmissionGuard;
  let service: ChangeRequestService;
  let routing: RoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
        {
          provide: ChangeRequestService,
          useClass: MockChangeRequestService,
        },
      ],
      imports: [RouterTestingModule],
    });

    guard = TestBed.inject(ChangeRequestSubmissionGuard);
    service = TestBed.inject(ChangeRequestService);
    routing = TestBed.inject(RoutingService);

    spyOn(routing, 'go').and.stub();
  });

  it(`should redirect to the homepage when change request is submitted`, () => {
    mockChangeRequest.requestStatus = ChangeRequestStatus.SUBMITTED;
    spyOn(service, 'getChangeRequest').and.returnValue(of(mockChangeRequest));
    let result;
    guard
      .canActivate()
      .subscribe(isActive => (result = isActive))
      .unsubscribe();
    expect(result).toBeFalsy();
    expect(routing.go).toHaveBeenCalled();
  });

  it(`should not redirect to the homepage when change request is not submitted`, () => {
    mockChangeRequest.requestStatus = ChangeRequestStatus.REFERRED;
    spyOn(service, 'getChangeRequest').and.returnValue(of(mockChangeRequest));
    let result;
    guard
      .canActivate()
      .subscribe(isActive => (result = isActive))
      .unsubscribe();
    expect(result).toBeTruthy();
    expect(routing.go).not.toHaveBeenCalled();
  });
});
