import { Type } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { AuthService, OCC_USER_ID_CURRENT, UserToken } from '@spartacus/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import * as fromAction from '../store/actions';
import * as fromReducer from '../store/reducers';
import { reducerProvider, reducerToken } from '../store/reducers';
import { ChangeRequestService } from './change-request.service';

const userId = OCC_USER_ID_CURRENT;
const policyId = 'PL00001';
const contractId = 'CT00001';
const requestId = 'requestId';
const changeRequestType = 'requestType';

const mockChangeRequest = {
  requestId: requestId,
  submissionId: 'submssionId',
};

const userToken$ = new ReplaySubject<UserToken>();

class MockAuthService {
  getOccUserId(): Observable<string> {
    return of(OCC_USER_ID_CURRENT);
  }
  getUserToken(): Observable<UserToken> {
    return userToken$.asObservable();
  }
}

describe('ChangeRequestServiceTest', () => {
  let service: ChangeRequestService;
  let store: Store<fromReducer.ChangeRequestState>;
  let authService: MockAuthService;

  beforeEach(() => {
    authService = new MockAuthService();

    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('changeRequests', reducerToken),
      ],
      providers: [
        ChangeRequestService,
        reducerProvider,
        { provide: AuthService, useValue: authService },
      ],
    });
    service = TestBed.get(ChangeRequestService as Type<ChangeRequestService>);
    store = TestBed.get(Store as Type<Store<fromReducer.ChangeRequestState>>);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should check if ChangeRequestService is injected', inject(
    [ChangeRequestService],
    (changeRequestService: ChangeRequestService) => {
      expect(changeRequestService).toBeTruthy();
    }
  ));

  it('shuld be able to load change request', () => {
    service.requestId = requestId;
    service.loadChangeRequest();
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.LoadChangeRequest({
        userId: userId,
        requestId: requestId,
      })
    );
  });

  it('should be able to create change request for policy', () => {
    service.createChangeRequest(policyId, contractId, changeRequestType);
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.CreateChangeRequest({
        userId: userId,
        policyId: policyId,
        changeRequestType: changeRequestType,
        contractId: contractId,
      })
    );
  });

  it('should be able to simulate change request for policy', () => {
    service.simulateChangeRequest(mockChangeRequest);
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.SimulateChangeRequest({
        userId: userId,
        requestId: mockChangeRequest.requestId,
        changeRequest: mockChangeRequest,
      })
    );
  });

  it('should be able to get change request', () => {
    store.dispatch(
      new fromAction.CreateChangeRequestSuccess(mockChangeRequest)
    );
    let response;
    service
      .getChangeRequest()
      .subscribe(changeRequest => {
        response = changeRequest;
      })
      .unsubscribe();
    expect(response).toEqual(mockChangeRequest);
  });
});
