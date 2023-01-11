import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  AuthGuard,
  CustomerCouponService,
  I18nTestingModule,
} from '@spartacus/core';
import {
  ActiveCartService,
  CartVoucherService,
} from '@spartacus/cart/base/core';
import { Observable, of } from 'rxjs';
import { FSCartService } from '../../../../core/cart/facade/cart.service';
import { FSCartCouponComponent } from './cart-coupon.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FSProduct, FSCart } from './../../../../occ/occ-models/occ.models';
import createSpyObj = jasmine.createSpyObj;

const mockProduct: FSProduct = {
  code: 'testProduct',
  defaultCategory: {
    code: 'testDefaultCategory',
    name: 'test category',
  },
};

const mockCart: FSCart = {
  code: 'testCode',
  guid: 'testUid',
  deliveryOrderGroups: [
    {
      quantity: 1,
    },
  ],
  insuranceQuote: {
    state: {
      code: 'UNBIND',
    },
  },
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

const mockActiveCartService = createSpyObj('ActiveCartService', [
  'getActive',
  'getActiveCartId',
  'isStable',
]);

const mockCartVoucherService = createSpyObj('CartVoucherService', [
  'addVoucher',
  'getAddVoucherResultSuccess',
  'resetAddVoucherProcessingState',
  'getAddVoucherResultError',
  'getAddVoucherResultLoading',
]);

const mockCustomerCouponService = createSpyObj('CustomerCouponService', [
  'loadCustomerCoupons',
  'getCustomerCoupons',
]);

class MockCartService {
  isStable() {
    return of(true);
  }
  getActive(): Observable<FSCart> {
    return of(mockCart);
  }
}

class MockAuthGuard {
  canActivate = jasmine
    .createSpy('AuthGuard.canActivate')
    .and.returnValue(of(true));
}

describe('FSCartCouponComponent', () => {
  let component: FSCartCouponComponent;
  let fixture: ComponentFixture<FSCartCouponComponent>;
  let input: HTMLInputElement;
  let mockFSCartService: FSCartService;
  let mockAuthGaurd: AuthGuard;
  let el: DebugElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, I18nTestingModule],
        providers: [
          { provide: ActiveCartService, useValue: mockActiveCartService },
          { provide: CartVoucherService, useValue: mockCartVoucherService },
          {
            provide: CustomerCouponService,
            useValue: mockCustomerCouponService,
          },
          { provide: FSCartService, useClass: MockCartService },
          { provide: AuthGuard, useClass: MockAuthGuard },
        ],
        declarations: [FSCartCouponComponent],
      }).compileComponents();

      mockActiveCartService.getActive.and.returnValue(of<FSCart>(mockCart));
      mockActiveCartService.getActiveCartId.and.returnValue(
        of<string>('testCode')
      );
      mockActiveCartService.isStable.and.returnValue(of(true));
      mockCartVoucherService.addVoucher.and.stub();
      mockCartVoucherService.getAddVoucherResultSuccess.and.returnValue(of());
      mockCartVoucherService.getAddVoucherResultError.and.returnValue(of());
      mockCartVoucherService.getAddVoucherResultLoading.and.returnValue(of());
      mockCustomerCouponService.getCustomerCoupons.and.returnValue(of({}));
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FSCartCouponComponent);
    component = fixture.componentInstance;
    mockFSCartService = TestBed.inject(FSCartService);
    mockAuthGaurd = TestBed.inject(AuthGuard);
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply voucher', () => {
    const applyBtn = el.query(By.css('button')).nativeElement;
    input = el.query(By.css('.form-control')).nativeElement;
    input.value = 'couponCode1';
    input.dispatchEvent(new Event('input'));
    applyBtn.click();
    expect(component.couponForm.controls['couponCode'].value).toEqual(
      'couponCode1'
    );
  });

  it('should not apply voucher if there is no code entered', () => {
    const applyBtn = el.query(By.css('button')).nativeElement;
    input = el.query(By.css('.form-control')).nativeElement;
    input.value = '';
    input.dispatchEvent(new Event('input'));
    applyBtn.click();
    expect(component.couponForm.controls['couponCode'].value).toEqual('');
  });
});
