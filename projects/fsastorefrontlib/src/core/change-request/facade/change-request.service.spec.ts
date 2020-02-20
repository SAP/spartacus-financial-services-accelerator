import { TestBed, inject } from '@angular/core/testing';
import * as fromReducer from '../store/reducers';
import { Store, StoreModule } from '@ngrx/store';
import { Type } from '@angular/core';
import * as fromAction from '../store/actions';
import { reducerProvider, reducerToken } from '../store/reducers';
import { of, Observable } from 'rxjs';
import { OCC_USER_ID_CURRENT, AuthService } from '@spartacus/core';
import { ChangeRequestService } from './change-request.service';

const userId = OCC_USER_ID_CURRENT;
const policyId = 'PL00001';
const contractId = 'CT00001';
const changeRequestType = 'requestType';

const mockChangeRequest = {
  submissionId: 'submssionId',
};

class MockAuthService {
  getOccUserId(): Observable<string> {
    return of(OCC_USER_ID_CURRENT);
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

  it('should be able to load change request', () => {
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
