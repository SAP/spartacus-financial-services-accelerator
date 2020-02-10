import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Type } from '@angular/core';
import { FsCheckoutConnector } from './fs-checkout.connector';
import { FSCheckoutAdapter } from './fs-checkout.adapter';
import createSpy = jasmine.createSpy;

class MockFSCheckoutAdapter implements FSCheckoutAdapter {
  setIdentificationType = createSpy(
    'FSCheckoutAdapter.setIdentificationType'
  ).and.callFake((identificationType, cartId, userId) =>
    of('setIdentificationType' + identificationType + cartId + userId)
  );
}
const user = 'user';

describe('FsCheckoutConnector', () => {
  let fsCheckoutConnector: FsCheckoutConnector;
  let fsCheckoutAdapter: FSCheckoutAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: FSCheckoutAdapter, useClass: MockFSCheckoutAdapter },
      ],
    });

    fsCheckoutConnector = TestBed.get(FsCheckoutConnector as Type<
      FsCheckoutConnector
    >);
    fsCheckoutAdapter = TestBed.get(FSCheckoutAdapter as Type<
      FSCheckoutAdapter
    >);
  });

  it('should be created', () => {
    expect(fsCheckoutConnector).toBeTruthy();
  });
  it('should call adapter for getUserRequest', () => {
    fsCheckoutConnector.setIdentificationType('video', 'cartId', user);
    expect(fsCheckoutAdapter.setIdentificationType).toHaveBeenCalledWith(
      'video',
      'cartId',
      user
    );
  });
});
