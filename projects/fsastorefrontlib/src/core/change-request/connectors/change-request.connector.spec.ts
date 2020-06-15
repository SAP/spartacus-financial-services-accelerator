import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { OCC_CART_ID_CURRENT } from '@spartacus/core';
import { of } from 'rxjs';
import { ChangeRequestAdapter } from './change-request.adapter';
import { ChangeRequestConnector } from './change-request.connector';
import createSpy = jasmine.createSpy;

class MockChangeRequestAdapter implements ChangeRequestAdapter {
  createChangeRequestForPolicy = createSpy(
    'ChangeRequestAdapter.createChangeRequestForPolicy'
  ).and.callFake((policyId, contractId, userId) =>
    of('createChangeRequestForPolicy' + policyId + contractId + userId)
  );
  getChangeRequest = createSpy(
    'ChangeRequestAdapter.getChangeRequest'
  ).and.callFake((userId, requestId) =>
    of('getChangeRequest' + userId + requestId)
  );

  simulateChangeRequest = createSpy(
    'ChangeRequestAdapter.simulateChangeRequest'
  ).and.callFake((userId, requestId, changeRequestData) =>
    of('createChangeRequestForPolicy' + userId + requestId + changeRequestData)
  );
  cancelChangeRequest = createSpy(
    'ChangeRequestAdapter.cancelChangeRequest'
  ).and.callFake((userId, requestId) =>
    of('cancelChangeRequest' + userId + requestId)
  );
}

const policy = 'policyId';
const contract = 'contractId';
const requestID = 'requestId';
const changeRequestType = 'changeRequestType';
const user = 'userId';

describe('ChangeRequestConnector', () => {
  let changeRequestConnector: ChangeRequestConnector;
  let changeRequestAdapter: ChangeRequestAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ChangeRequestAdapter, useClass: MockChangeRequestAdapter },
      ],
    });

    changeRequestConnector = TestBed.inject(
      ChangeRequestConnector as Type<ChangeRequestConnector>
    );
    changeRequestAdapter = TestBed.inject(
      ChangeRequestAdapter as Type<ChangeRequestAdapter>
    );
  });

  it('should be created', () => {
    expect(changeRequestConnector).toBeTruthy();
  });

  it('should call adapter for createChangeRequestForPolicy', () => {
    changeRequestConnector.createChangeRequestForPolicy(
      policy,
      contract,
      changeRequestType,
      user
    );
    expect(
      changeRequestAdapter.createChangeRequestForPolicy
    ).toHaveBeenCalledWith(policy, contract, changeRequestType, user);
  });

  it('should call adapter for getChangeRequest', () => {
    changeRequestConnector.getChangeRequest(OCC_CART_ID_CURRENT, requestID);
    expect(changeRequestAdapter.getChangeRequest).toHaveBeenCalledWith(
      OCC_CART_ID_CURRENT,
      requestID
    );
  });

  it('should call adapter for cancelChangeRequest', () => {
    changeRequestConnector.cancelChangeRequest(OCC_CART_ID_CURRENT, requestID);
    expect(changeRequestAdapter.cancelChangeRequest).toHaveBeenCalledWith(
      OCC_CART_ID_CURRENT,
      requestID
    );
  });
});
