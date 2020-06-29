import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { AuthService, OCC_USER_ID_CURRENT, UserToken } from '@spartacus/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import * as fromAction from '../store/actions';
import { StateWithChangeRequest } from '../store/change-request-state';
import { reducerProvider, reducerToken } from '../store/reducers';
import { ChangeRequestService } from './change-request.service';

const userId = OCC_USER_ID_CURRENT;
const policyId = 'PL00001';
const contractId = 'CT00001';
const requestId = 'requestId';
const changeRequestType = 'requestType';
const stepIndex = '0';
const mockChangeRequest = {
  requestId: requestId,
  configurationSteps: [
    {
      name: 'Change Car Details',
      pageLabelOrId: 'changeCarDetailsPage',
      sequenceNumber: 1,
      status: 'UNSET',
    },
  ],
};
const stepData = {
  name: 'Change Car Details',
  pageLabelOrId: 'changeCarDetailsPage',
  sequenceNumber: 1,
  status: 'COMPLETED',
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
  let store: Store<StateWithChangeRequest>;
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
    service = TestBed.inject(ChangeRequestService);
    store = TestBed.inject(Store);

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
    service.simulateChangeRequest(mockChangeRequest, stepIndex);
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.SimulateChangeRequest({
        userId: userId,
        requestId: mockChangeRequest.requestId,
        changeRequest: mockChangeRequest,
        stepData: stepData,
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

  it('should be able to update change request', () => {
    service.updateChangeRequest(mockChangeRequest, stepIndex);
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.UpdateChangeRequest({
        userId: userId,
        requestId: requestId,
        stepData: stepData,
      })
    );
  });

  it('should be able to simulate change request for policy', () => {
    service.simulateChangeRequest(mockChangeRequest, stepIndex);
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.SimulateChangeRequest({
        userId: userId,
        requestId: mockChangeRequest.requestId,
        changeRequest: mockChangeRequest,
        stepData: stepData,
      })
    );
  });

  it('should be able to cancel change request', () => {
    service.cancelChangeRequest(requestId);
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.CancelChangeRequest({
        userId: userId,
        requestId: requestId,
      })
    );
  });

  it('should be able to get change request after cancelation', () => {
    store.dispatch(
      new fromAction.CancelChangeRequestSuccess(mockChangeRequest)
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
