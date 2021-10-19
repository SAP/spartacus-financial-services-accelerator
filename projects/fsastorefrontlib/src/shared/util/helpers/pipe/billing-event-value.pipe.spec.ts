import { TestBed } from '@angular/core/testing';
import { MockTranslatePipe, TranslatePipe } from '@spartacus/core';
import { BillingEventValuePipe } from './billing-event-value.pipe';

const cart1: any = {
  code: 'test001',
  insuranceQuote: {
    state: {
      code: 'BIND',
    },
    insuredObjectList: {
      insuredObjects: [
        {
          insuredObjectItems: [
            {
              label: 'tripDestination',
              value: 'Test value1',
            },
            {
              label: 'costOfTrip',
              value: 'Test value2',
            },
          ],
        },
      ],
    },
  },
  entries: [
    {
      product: {
        price: {
          oneTimeChargeEntries: [
            {
              billingTime: {
                code: 'personalliabilitycoverage',
                name: 'Personal Liability',
              },
              price: {
                formattedValue: '€1,000,000.00',
                value: 1000000,
              },
            },
            {
              billingTime: {
                code: 'investmentstrategy',
                name: 'Investment Strategy',
              },
              chargeInformation: 'Conservative',
              price: {
                formattedValue: '€0.00',
                value: 0,
              },
            },
          ],
        },
      },
    },
  ],
  deliveryOrderGroups: [
    {
      entries: [
        {
          product: {
            defaultCategory: {
              code: 'insurances_travel',
            },
          },
        },
      ],
    },
  ],
};
const quotes = {
  carts: [cart1],
};
const billingEventLabel1 = 'Personal Liability';
const billingEventLabel2 = 'Investment Strategy';

describe('BillingEventValuePipe', () => {
  let pipe: BillingEventValuePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BillingEventValuePipe,
        {
          provide: TranslatePipe,
          useClass: MockTranslatePipe,
        },
      ],
    });
    pipe = TestBed.inject(BillingEventValuePipe);
  });

  describe('transform', () => {
    it('should transform billint event to value', () => {
      expect(
        pipe.transform(
          quotes.carts[0].entries[0]?.product.price.oneTimeChargeEntries,
          ''
        )
      ).toEqual('fscommon.notIncluded');
      expect(
        pipe.transform(
          quotes.carts[0].entries[0]?.product.price.oneTimeChargeEntries,
          billingEventLabel1
        )
      ).toEqual('€1,000,000.00');
      expect(
        pipe.transform(
          quotes.carts[0].entries[0]?.product.price.oneTimeChargeEntries,
          billingEventLabel2
        )
      ).toEqual('Conservative');
    });
  });
});
