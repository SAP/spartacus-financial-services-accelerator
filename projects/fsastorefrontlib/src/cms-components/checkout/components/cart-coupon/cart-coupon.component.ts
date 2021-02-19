import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  ActiveCartService,
  AuthGuard,
  CartVoucherService,
  CustomerCouponService,
} from '@spartacus/core';
import { CartCouponComponent } from '@spartacus/storefront';
import { FSCartService } from '../../../../core/cart/facade/cart.service';

@Component({
  selector: 'cx-fs-cart-coupon',
  templateUrl: './cart-coupon.component.html',
})
export class FSCartCouponComponent extends CartCouponComponent
  implements OnInit {
  isUserRegistered;

  constructor(
    protected cartVoucherService: CartVoucherService,
    protected formBuilder: FormBuilder,
    protected customerCouponService: CustomerCouponService,
    protected activeCartService: ActiveCartService,
    protected cartService: FSCartService,
    protected authGuard: AuthGuard
  ) {
    super(cartVoucherService, formBuilder, customerCouponService, cartService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.authGuard
      .canActivate()
      .subscribe(data => (this.isUserRegistered = data));
    this.couponForm = this.formBuilder.group({
      couponCode: [''],
    });
  }

  applyVoucher() {
    if (!this.couponForm.get('couponCode').value) {
      return;
    }
    super.applyVoucher();
  }
}
