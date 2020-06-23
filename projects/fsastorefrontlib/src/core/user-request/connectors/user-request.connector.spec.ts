import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserRequestAdapter } from './user-request.adapter';
import { UserRequestConnector } from './user-request.connector';
import createSpy = jasmine.createSpy;

class MockUserRequestAdapter implements UserRequestAdapter {
  getUserRequest = createSpy('UserRequestAdapter.getUserRequest').and.callFake(
    (userId, request) => of('getUserRequest' + userId + request)
  );
  updateUserRequest = createSpy(
    'UserRequestAdapter.updateUserRequest'
  ).and.callFake((userId, request, stepData) =>
    of('updateUserRequest' + userId + request + stepData)
  );
  submitUserRequest = createSpy(
    'UserRequestAdapter.submitUserRequest'
  ).and.callFake((userId, request) =>
    of('submitUserRequest' + userId + request)
  );
}
const user = 'user';
const requestId = 'requestId';

describe('UserRequestConnector', () => {
  let userRequestConnector: UserRequestConnector;
  let userRequestAdapter: UserRequestAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: UserRequestAdapter, useClass: MockUserRequestAdapter },
      ],
    });

    userRequestConnector = TestBed.inject(UserRequestConnector);
    userRequestAdapter = TestBed.inject(UserRequestAdapter);
  });

  it('should be created', () => {
    expect(userRequestConnector).toBeTruthy();
  });
  it('should call adapter for getUserRequest', () => {
    userRequestConnector.getUserRequest(user, requestId);
    expect(userRequestAdapter.getUserRequest).toHaveBeenCalledWith(
      user,
      requestId
    );
  });
  it('should call adapter for updateUserRequest', () => {
    userRequestConnector.updateUserRequest(user, requestId, {});
    expect(userRequestAdapter.updateUserRequest).toHaveBeenCalledWith(
      user,
      requestId,
      {}
    );
  });
  it('should call adapter for submitUserRequest', () => {
    userRequestConnector.getUserRequest(user, requestId);
    expect(userRequestAdapter.getUserRequest).toHaveBeenCalledWith(
      user,
      requestId
    );
  });
});
