import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  ActiveCartService,
  CartVoucherService,
  CustomerCouponService,
} from '@spartacus/core';
import { CartCouponComponent } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { FSCartService } from '../../../../core/cart/facade/cart.service';

@Component({
  selector: 'cx-fs-cart-coupon',
  templateUrl: './cart-coupon.component.html',
})
export class FSCartCouponComponent extends CartCouponComponent {
  isCartStable$: Observable<boolean>;

  constructor(
    protected cartVoucherService: CartVoucherService,
    protected formBuilder: FormBuilder,
    protected customerCouponService: CustomerCouponService,
    protected activeCartService: ActiveCartService,
    protected cartService: FSCartService
  ) {
    super(cartVoucherService, formBuilder, customerCouponService, cartService);
    this.isCartStable$ = this.cartService.isStable();
  }
}
