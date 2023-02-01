import { Component } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import {
  ActiveCartService,
  CartVoucherService,
} from '@spartacus/cart/base/core';
import { CustomerCouponService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CartCouponComponent } from '@spartacus/cart/base/components';
import { FSCartService } from '../../../../core/cart/facade/cart.service';

@Component({
  selector: 'cx-fs-cart-coupon',
  templateUrl: './cart-coupon.component.html',
})
export class FSCartCouponComponent extends CartCouponComponent {
  isCartStable$: Observable<boolean>;

  constructor(
    protected cartVoucherService: CartVoucherService,
    protected formBuilder: UntypedFormBuilder,
    protected customerCouponService: CustomerCouponService,
    protected activeCartService: ActiveCartService,
    protected cartService: FSCartService
  ) {
    super(cartVoucherService, formBuilder, customerCouponService, cartService);
    this.isCartStable$ = this.cartService.isStable();
  }
}
