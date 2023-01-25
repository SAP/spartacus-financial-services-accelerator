import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { CartVoucherService } from '@spartacus/cart/base/core';
import { Voucher } from '@spartacus/cart/base/root';
import {
  I18nTestingModule,
} from '@spartacus/core';
import { PromotionsModule } from '@spartacus/storefront';
import { FSOrderSummaryComponent } from './order-summary.component';

@Component({
  // eslint-disable-next-line
  selector: 'cx-applied-coupons',
  template: '',
})
class MockAppliedCouponsComponent {
  @Input()
  vouchers: Voucher[];
  @Input()
  cartIsLoading = false;
  @Input()
  isReadOnly = false;
}

describe('FSOrderSummaryComponent', () => {
  let component: FSOrderSummaryComponent;
  let fixture: ComponentFixture<FSOrderSummaryComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [CommonModule, PromotionsModule, I18nTestingModule],
        declarations: [FSOrderSummaryComponent, MockAppliedCouponsComponent],
        providers: [{ provide: CartVoucherService, useValue: {} }],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FSOrderSummaryComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
