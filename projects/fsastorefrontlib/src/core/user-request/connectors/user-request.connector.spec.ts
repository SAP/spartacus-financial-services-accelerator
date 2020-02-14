import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Type } from '@angular/core';
import createSpy = jasmine.createSpy;
import { UserRequestAdapter } from './user-request.adapter';
import { UserRequestConnector } from './user-request.connector';

class MockUserRequestAdapter implements UserRequestAdapter {
  getUserRequest = createSpy('UserRequestAdapter.getUserRequest').and.callFake(
    (userId, requestId) => of('getUserRequest' + userId + requestId)
  );
  updateUserRequest = createSpy(
    'UserRequestAdapter.updateUserRequest'
  ).and.callFake((userId, requestId, stepData) =>
    of('updateUserRequest' + userId + requestId + stepData)
  );
  submitUserRequest = createSpy(
    'UserRequestAdapter.submitUserRequest'
  ).and.callFake((userId, requestId) =>
    of('submitUserRequest' + userId + requestId)
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

    userRequestConnector = TestBed.get(UserRequestConnector as Type<
      UserRequestConnector
    >);
    userRequestAdapter = TestBed.get(UserRequestAdapter as Type<
      UserRequestAdapter
    >);
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
