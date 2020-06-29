import { inject, TestBed } from '@angular/core/testing';
import { FormDataStorageService } from '@fsa/dynamicforms';
import { Store, StoreModule } from '@ngrx/store';
import { AuthService, OCC_USER_ID_CURRENT, UserToken } from '@spartacus/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { FSUserRequest } from '../../../occ/occ-models/occ.models';
import * as fromAction from '../store/actions';
import { reducerProvider, reducerToken } from '../store/reducers/index';
import { FSUserRequestState } from '../store/user-request-state';
import { UserRequestService } from './user-request.service';

const requestId = '001';
const mockUserRequest = {
  requestId: requestId,
};
class MockFormDataStorageService {
  setFormDataToLocalStorage() {}
}

const userToken$ = new ReplaySubject<UserToken>();

class MockAuthService {
  getOccUserId(): Observable<string> {
    return of(OCC_USER_ID_CURRENT);
  }
  getUserToken(): Observable<UserToken> {
    return userToken$.asObservable();
  }
}

describe('UserRequestServiceTest', () => {
  let service: UserRequestService;
  let store: Store<FSUserRequestState>;
  let authService: MockAuthService;
  let mockFormDataStorageService: FormDataStorageService;

  beforeEach(() => {
    authService = new MockAuthService();

    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('userRequest', reducerToken),
      ],
      providers: [
        UserRequestService,
        reducerProvider,
        { provide: AuthService, useValue: authService },
        {
          provide: FormDataStorageService,
          useClass: MockFormDataStorageService,
        },
      ],
    });
    service = TestBed.inject(UserRequestService);
    store = TestBed.inject(Store);
    mockFormDataStorageService = TestBed.inject(FormDataStorageService);

    spyOn(store, 'dispatch').and.callThrough();
    spyOn(mockFormDataStorageService, 'setFormDataToLocalStorage').and.stub();
  });

  it('should inject User request service', inject(
    [UserRequestService],
    (userRequestService: UserRequestService) => {
      expect(userRequestService).toBeTruthy();
    }
  ));

  it('should set form data after loading user request', () => {
    const userRequest: FSUserRequest = {
      configurationSteps: [{ yformConfigurator: { id: 'id' } }],
    };
    service.loadUserRequestFormData(userRequest);
    expect(
      mockFormDataStorageService.setFormDataToLocalStorage
    ).toHaveBeenCalled();
  });

  it('should not set from data after loading user request', () => {
    const userRequest: FSUserRequest = {
      configurationSteps: [{}],
    };
    service.loadUserRequestFormData(userRequest);
    expect(
      mockFormDataStorageService.setFormDataToLocalStorage
    ).not.toHaveBeenCalled();
  });

  it('should be able to get user request', () => {
    store.dispatch(new fromAction.UpdateUserRequestSuccess(mockUserRequest));
    let response;
    service
      .getUserRequest()
      .subscribe(userRequest => {
        response = userRequest;
      })
      .unsubscribe();
    expect(response).toEqual(mockUserRequest);
  });
});
