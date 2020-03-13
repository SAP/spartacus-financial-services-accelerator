import { TestBed, inject } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { OCC_USER_ID_CURRENT, UserToken, AuthService } from '@spartacus/core';
import { Type } from '@angular/core';
import { FormDataService } from '@fsa/dynamicforms';
import * as fromReducer from '../store/reducers';
import * as fromAction from '../store/actions';
import { of, Observable, ReplaySubject } from 'rxjs';
import { UserRequestService } from './user-request.service';
import { reducerProvider, reducerToken } from '../store/reducers/index';
import { FSUserRequest } from '../../../occ/occ-models/occ.models';

const userId = OCC_USER_ID_CURRENT;
const formId = 'formId';
const status = 'VISITED';
const requestId = '001';

class MockFormDataService {
  formData;

  getFormData() {
    return of(this.formData);
  }

  setFormDataToLocalStorage() {
    this.formData = formId;
  }
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
  let store: Store<fromReducer.FSUserRequestState>;
  let formDataService: MockFormDataService;
  let authService: MockAuthService;

  beforeEach(() => {
    formDataService = new MockFormDataService();
    authService = new MockAuthService();

    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('userRequest', reducerToken),
      ],
      providers: [
        UserRequestService,
        reducerProvider,
        { provide: FormDataService, useValue: formDataService },
        { provide: AuthService, useValue: authService },
      ],
    });
    service = TestBed.get(UserRequestService as Type<UserRequestService>);
    store = TestBed.get(Store as Type<Store<fromReducer.FSUserRequestState>>);
    spyOn(store, 'dispatch').and.callThrough();
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
    let formDataValue = null;
    formDataService.getFormData().subscribe(formData => {
      formDataValue = formData;
    });
    expect(formDataValue).not.toBeNull();
    expect(formDataValue).toBe(formId);
  });

  it('should not set from data after loading user request', () => {
    const userRequest: FSUserRequest = {
      configurationSteps: [{}],
    };
    let formDataValue = null;
    formDataService.getFormData().subscribe(formData => {
      formDataValue = formData;
    });
    service.loadUserRequestFormData(userRequest);
    expect(formDataValue).toBe(undefined);
  });

  it('should be able to get actions', () => {
    let result = null;
    const actionName = fromAction.UPDATE_USER_REQUEST;
    service.getAction(actionName).subscribe(action => (result = action));
    store.dispatch(
      new fromAction.UpdateUserRequest({
        userId: userId,
        requestId: requestId,
      })
    );
    expect(result.type).toBe(actionName);
  });
});
