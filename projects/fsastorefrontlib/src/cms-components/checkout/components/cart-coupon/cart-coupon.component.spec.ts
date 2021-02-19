import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  ActiveCartService,
  AuthGuard,
  CartVoucherService,
  CustomerCouponService,
  I18nTestingModule,
} from '@spartacus/core';
import { FSCart } from 'fsastorefrontlib/occ';
import { Observable, of } from 'rxjs';
import { FSCartService } from '../../../../core/cart/facade/cart.service';
import createSpyObj = jasmine.createSpyObj;

import { FSCartCouponComponent } from './cart-coupon.component';

const mockActiveCartService = createSpyObj('ActiveCartService', [
  'getActive',
  'getActiveCartId',
  'isStable',
]);

const mockCartVoucherService = createSpyObj('CartVoucherService', [
  'getAddVoucherResultSuccess',
  'resetAddVoucherProcessingState',
  'getAddVoucherResultError',
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
    return of();
  }
}

class MockAuthGuard {
  canActivate = jasmine
    .createSpy('AuthGuard.canActivate')
    .and.returnValue(of('authGuard-result'));
}

describe('FSCartCouponComponent', () => {
  let component: FSCartCouponComponent;
  let fixture: ComponentFixture<FSCartCouponComponent>;

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

      mockActiveCartService.getActiveCartId.and.returnValue(of<string>('123'));
      mockActiveCartService.isStable.and.returnValue(of(true));
      mockCartVoucherService.getAddVoucherResultSuccess.and.returnValue(of());
      mockCartVoucherService.getAddVoucherResultError.and.returnValue(of());
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FSCartCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
