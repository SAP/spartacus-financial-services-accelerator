import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { BillingTimeAdapter } from './billing-time.adapter';
import { BillingTimeConnector } from './billing-time.connector';
import createSpy = jasmine.createSpy;

class MockBillingTimeAdapter implements BillingTimeAdapter {
  getBillingTimes = createSpy(
    'BillingTimeAdapter.getBillingTimes'
  ).and.callFake(productCodes => of('getBillingTimes' + productCodes));
}

const products: string[] = ['product1'];

describe('BillingTimeConnector', () => {
  let billingTimeConnector: BillingTimeConnector;
  let billingTimeAdapter: BillingTimeAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: BillingTimeAdapter, useClass: MockBillingTimeAdapter },
      ],
    });

    billingTimeConnector = TestBed.inject(BillingTimeConnector);
    billingTimeAdapter = TestBed.inject(BillingTimeAdapter);
  });

  it('should be created', () => {
    expect(billingTimeConnector).toBeTruthy();
  });

  it('should call adapter for getBillingTimes', () => {
    billingTimeConnector.getBillingTimes(products);
    expect(billingTimeAdapter.getBillingTimes).toHaveBeenCalledWith(products);
  });
});
