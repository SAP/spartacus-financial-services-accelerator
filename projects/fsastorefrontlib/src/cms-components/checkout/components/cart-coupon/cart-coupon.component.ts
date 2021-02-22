import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  ActiveCartService,
  CartVoucherService,
  CustomerCouponService,
  OCC_USER_ID_CURRENT,
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
  currentUser;
  userRegistered$: Observable<any>;

  constructor(
    protected cartVoucherService: CartVoucherService,
    protected formBuilder: FormBuilder,
    protected customerCouponService: CustomerCouponService,
    protected activeCartService: ActiveCartService,
    protected cartService: FSCartService,
    protected userIdService: UserIdService
  ) {
    super(cartVoucherService, formBuilder, customerCouponService, cartService);
    this.currentUser = OCC_USER_ID_CURRENT;
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.userRegistered$ = this.userIdService.getUserId();
  }
}
