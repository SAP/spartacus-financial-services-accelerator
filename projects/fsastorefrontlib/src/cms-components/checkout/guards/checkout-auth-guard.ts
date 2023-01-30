import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import {
  CheckoutAuthGuard,
  CheckoutConfigService,
} from '@spartacus/checkout/base/components';
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
import { combineLatest, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FSCheckoutAuthGuard extends CheckoutAuthGuard {
  constructor(
    protected authService: AuthService,
    protected authRedirectService: AuthRedirectService,
    protected checkoutConfigService: CheckoutConfigService,
    protected activeCartFacade: ActiveCartFacade,
    protected semanticPathService: SemanticPathService,
    protected router: Router,
    protected userService: UserAccountFacade,
    protected userAccountFacade: UserAccountFacade,
    protected globalMessageService: GlobalMessageService
  ) {
    super(
      authService,
      authRedirectService,
      checkoutConfigService,
      activeCartFacade,
      semanticPathService,
      router
    );
  }

  canActivate(): Observable<boolean | UrlTree> {
    return combineLatest([
      this.authService.isUserLoggedIn(),
      this.activeCartFacade.isGuestCart(),
      this.userAccountFacade.get(),
      this.activeCartFacade.isStable(),
    ]).pipe(
      map(([isLoggedIn, isGuestCart, user, isStable]) => ({
        isLoggedIn,
        isGuestCart,
        user,
        isStable,
      })),
      filter((data) => data.isStable),
      // if the user is authenticated and we have their data, OR if the user is anonymous
      filter((data) => (!!data.user && data.isLoggedIn) || !data.isLoggedIn),
      map((data) => {
        if (!data.isLoggedIn) {
          return data.isGuestCart ? true : this.handleAnonymousUser();
        } else if (data.user && 'roles' in data.user) {
          return this.handleUserRole(data.user);
        }
        return data.isLoggedIn;
      })
    );
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
    return this.router.parseUrl(this.semanticPathService.get('home') ?? '');
  }
}
