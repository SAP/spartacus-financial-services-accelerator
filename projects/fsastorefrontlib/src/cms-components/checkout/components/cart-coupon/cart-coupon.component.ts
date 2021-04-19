import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  ActiveCartService,
  CartVoucherService,
  CustomerCouponService,
  UserIdService,
} from '@spartacus/core';
import { CartCouponComponent } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { FSCartService } from '../../../../core/cart/facade/cart.service';

@Component({
  selector: 'cx-fs-cart-coupon',
  templateUrl: './cart-coupon.component.html',
})
export class FSCartCouponComponent extends CartCouponComponent
  implements OnInit, OnDestroy {
  userRegistered$: Observable<any>;
  isCartStable$: Observable<boolean>;

  constructor(
    protected cartVoucherService: CartVoucherService,
    protected formBuilder: FormBuilder,
    protected customerCouponService: CustomerCouponService,
    protected activeCartService: ActiveCartService,
    protected cartService: FSCartService,
    protected userIdService: UserIdService
  ) {
    super(cartVoucherService, formBuilder, customerCouponService, cartService);
    this.isCartStable$ = this.cartService.isStable();
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.userRegistered$ = this.userIdService.getUserId();
  }
}
