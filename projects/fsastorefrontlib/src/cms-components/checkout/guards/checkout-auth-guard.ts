import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { ActiveCartService } from '@spartacus/cart/base/core';
import { CheckoutAuthGuard, CheckoutConfigService } from '@spartacus/checkout/base/components';
import {
  AuthRedirectService,
  AuthService,
  B2BUser,
  B2BUserRole,
  GlobalMessageService,
  GlobalMessageType,
  SemanticPathService,
  User,
} from '@spartacus/core';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FSCheckoutAuthGuard extends CheckoutAuthGuard {
  constructor(
    protected authService: AuthService,
    protected authRedirectService: AuthRedirectService,
    protected checkoutConfigService: CheckoutConfigService,
    protected activeCartService: ActiveCartService,
    protected semanticPathService: SemanticPathService,
    protected router: Router,
    protected userService: UserAccountFacade,
    protected globalMessageService: GlobalMessageService
  ) {
    super(
      authService,
      authRedirectService,
      checkoutConfigService,
      activeCartService,
      semanticPathService,
      router
    );
  }

  canActivate(): Observable<boolean | UrlTree> {
    return super.canActivate();
  }

  protected handleUserRole(user: User): boolean | UrlTree {
    const roles = (<B2BUser>user).roles;
    if (
      roles?.includes('customergroup') ||
      roles?.includes(B2BUserRole.CUSTOMER)
    ) {
      return true;
    }
    this.globalMessageService.add(
      { key: 'checkout.invalid.accountType' },
      GlobalMessageType.MSG_TYPE_WARNING
    );
    return this.router.parseUrl(this.semanticPathService.get('home'));
  }
}
