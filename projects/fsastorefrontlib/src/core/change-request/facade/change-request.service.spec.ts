import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import {
  AuthService,
  OCC_USER_ID_CURRENT,
  UserIdService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
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

class MockUserIdService {
  getUserId(): Observable<string> {
    return of(OCC_USER_ID_CURRENT);
  }
}
class MockAuthService {
  isUserLoggedIn() {
    return of(true);
  }
}
describe('ChangeRequestServiceTest', () => {
  let service: ChangeRequestService;
  let store: Store<StateWithChangeRequest>;
  let authService: MockAuthService;
  let userIdService: MockUserIdService;

  beforeEach(() => {
    authService = new MockAuthService();
    userIdService = new MockUserIdService();

    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('changeRequests', reducerToken),
      ],
      providers: [
        ChangeRequestService,
        reducerProvider,
        { provide: AuthService, useValue: authService },
        { provide: UserIdService, useValue: userIdService },
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
    service.loadChangeRequest(requestId);
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
