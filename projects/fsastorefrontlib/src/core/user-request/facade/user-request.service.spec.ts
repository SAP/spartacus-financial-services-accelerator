import { TestBed, inject } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { OCC_USER_ID_CURRENT } from '@spartacus/core';
import { Type } from '@angular/core';
import { FormDataService } from '@fsa/dynamicforms';
import * as fromReducer from '../store/reducers';
import * as fromAction from '../store/actions';
import { of } from 'rxjs';
import { UserRequestDataService } from './../services/user-request-data.service';
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

class MockUserRequestDataService {
  userId = userId;
  requestId = requestId;
}

describe('UserRequestServiceTest', () => {
  let service: UserRequestService;
  let store: Store<fromReducer.FSUserRequestState>;
  let userRequestDataService: MockUserRequestDataService;
  let formDataService: MockFormDataService;
  beforeEach(() => {
    userRequestDataService = new MockUserRequestDataService();
    formDataService = new MockFormDataService();

    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('userRequest', reducerToken),
      ],
      providers: [
        UserRequestService,
        reducerProvider,
        { provide: UserRequestDataService, useValue: userRequestDataService },
        { provide: FormDataService, useValue: formDataService },
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

  it('should be able to load user request', () => {
    service.loadUserRequestData();
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.LoadUserRequest({ userId: userId, requestId: requestId })
    );
  });
  it('should not load user request with null requestId', () => {
    userRequestDataService.requestId = null;
    service.loadUserRequestData();
    expect(store.dispatch).not.toHaveBeenCalledWith(
      new fromAction.LoadUserRequest({ userId: userId, requestId: requestId })
    );
  });
  it('should be able to resume user request', () => {
    service.resumeRequest(requestId);
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.LoadUserRequest({ userId: userId, requestId: requestId })
    );
  });

  it('should be able to update user request', () => {
    service.updateUserRequestStep(
      { requestId: requestId, configurationSteps: [{}, {}] },
      0,
      status
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.UpdateUserRequest({
        userId: userId,
        requestId: requestId,
        stepData: { status: status },
      })
    );
  });

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

  it('should not load user request', () => {
    store.dispatch(
      new fromAction.LoadUserRequestSuccess({
        requestId: requestId,
        configurationSteps: [{}],
      })
    );
    service.getUserRequest();
    expect(store.dispatch).not.toHaveBeenCalledWith(
      new fromAction.LoadUserRequest({ userId: userId, requestId: requestId })
    );
  });

  it('should load user request', () => {
    store.dispatch(new fromAction.LoadUserRequestSuccess({}));
    service.getUserRequest();
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.LoadUserRequest({ userId: userId, requestId: requestId })
    );
  });
});
