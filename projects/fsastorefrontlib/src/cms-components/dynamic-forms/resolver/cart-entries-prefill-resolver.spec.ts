import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { I18nTestingModule } from '@spartacus/core';
import { Cart } from '@spartacus/cart/base/root';
import { of } from 'rxjs';
import { FSCartService } from './../../../core/cart/facade/cart.service';
import { CartEntriesPrefillResolver } from './cart-entries-prefill-resolver';

const cartCode = '0000001';
const product1 = 'product1';
const product2 = 'product2';

const mockCart: Cart = {
  code: cartCode,
  deliveryOrderGroups: [
    {
      entries: [
        {
          product: {
            code: product1,
          },
        },
        {
          product: {
            code: product2,
          },
        },
      ],
    },
  ],
};

class MockCartService {
  getActive(): any {
    return of(mockCart);
  }
}

describe('CartEntriesPrefilResolver', () => {
  let cartEntriesResolver: CartEntriesPrefillResolver;
  let cartService: MockCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, StoreModule.forRoot({})],
      providers: [{ provide: FSCartService, useClass: MockCartService }],
    });

    cartEntriesResolver = TestBed.inject(CartEntriesPrefillResolver);
    cartService = TestBed.inject(FSCartService);
  });

  it('should inject cart entries resolver', () => {
    expect(cartEntriesResolver).toBeTruthy();
  });

  it('should resolve cart with entries', () => {
    let result;
    cartEntriesResolver
      .getPrefillValue()
      .subscribe(value => {
        result = value;
      })
      .unsubscribe();
    expect(result).toEqual(product1 + ',' + product2);
  });

  it('should check cart without product code', () => {
    spyOn(cartService, 'getActive').and.returnValue(
      of({
        deliveryOrderGroups: [
          {
            entries: [
              {
                product: {
                  name: 'Test Product',
                },
              },
            ],
          },
        ],
      })
    );
    let result;
    cartEntriesResolver
      .getPrefillValue()
      .subscribe(value => {
        result = value;
      })
      .unsubscribe();
    expect(result).toEqual('');
  });
});
