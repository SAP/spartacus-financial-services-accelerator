import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Cart, I18nTestingModule } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { FSCartService } from './../../../../core/cart/facade/cart.service';
import { FSTranslationService } from './../../../../core/i18n/facade/translation.service';
import { FSProduct } from './../../../../occ/occ-models/occ.models';
import { MiniCartComponent } from './mini-cart.component';

const mockProduct: FSProduct = {
  code: 'testProduct',
  defaultCategory: {
    code: 'testDefaultCategory',
    name: 'test category',
  },
};

const mockCart: Cart = {
  code: 'testCode',
  guid: 'testUid',
  deliveryOrderGroups: [
    {
      quantity: 1,
    },
  ],
  entries: [
    {
      product: mockProduct,
    },
  ],
  totalItems: 0,
  totalPrice: {
    currencyIso: 'USD',
    value: 10.0,
  },
};

class MockCartService {
  getActive(): Observable<Cart> {
    return of(mockCart);
  }
}

class MockFSTranslationService {
  getTranslationValue() { }
}
describe('MiniCartComponent', () => {
  let miniCartComponent: MiniCartComponent;
  let fixture: ComponentFixture<MiniCartComponent>;
  let translationService: FSTranslationService;
  let cartService: FSCartService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, I18nTestingModule],
      declarations: [MiniCartComponent],
      providers: [
        { provide: FSCartService, useClass: MockCartService },
        {
          provide: FSTranslationService,
          useClass: MockFSTranslationService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniCartComponent);
    translationService = TestBed.inject(FSTranslationService);
    cartService = TestBed.inject(FSCartService);
    miniCartComponent = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(miniCartComponent).toBeTruthy();
  });

  it('should get active cart', () => {
    miniCartComponent.cart$
      .subscribe(cartData => {
        expect(cartData).toBe(mockCart);
      })
      .unsubscribe();
  });

  it('should find translation for key', () => {
    spyOn(translationService, 'getTranslationValue').and.returnValue(
      'test value'
    );
    const translationValue = miniCartComponent.getTranslation(
      'insurances_auto',
      'vehicleMake'
    );
    expect(translationValue).toEqual('test value');
  });
});
