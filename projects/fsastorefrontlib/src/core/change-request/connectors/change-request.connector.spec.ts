import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Type } from '@angular/core';
import createSpy = jasmine.createSpy;
import { ChangeRequestAdapter } from './change-request.adapter';
import { ChangeRequestConnector } from './change-request.connector';

class MockChangeRequestAdapter implements ChangeRequestAdapter {
  createChangeRequestForPolicy = createSpy(
    'ChangeRequestAdapter.createChangeRequestForPolicy'
  ).and.callFake((policyId, contractId, userId) =>
    of('createChangeRequestForPolicy' + policyId + contractId + userId)
  );
}

const policy = 'policyId';
const contract = 'contractId';
const user = 'userId';

describe('FsCartConnector', () => {
  let changeRequestConnector: ChangeRequestConnector;
  let changeRequestAdapter: ChangeRequestAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ChangeRequestAdapter, useClass: MockChangeRequestAdapter },
      ],
    });

    changeRequestConnector = TestBed.get(ChangeRequestConnector as Type<
      ChangeRequestConnector
    >);
    changeRequestAdapter = TestBed.get(ChangeRequestAdapter as Type<
      ChangeRequestAdapter
    >);
  });

  it('should be created', () => {
    expect(changeRequestConnector).toBeTruthy();
  });

  it('should call adapter for createChangeRequestForPolicy', () => {
    changeRequestConnector.createChangeRequestForPolicy(policy, contract, user);
    expect(
      changeRequestAdapter.createChangeRequestForPolicy
    ).toHaveBeenCalledWith(policy, contract, user);
  });
});
