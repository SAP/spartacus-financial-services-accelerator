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
      this.activeCartFacade.getAssignedUser(),
      this.userService.get(),
      this.activeCartFacade.isStable(),
    ]).pipe(
      filter(([, , _user, isStable]) => isStable),
      // if the user is authenticated and we have their data, OR if the user is anonymous
      filter(([isLoggedIn, , user]) => (!!user && isLoggedIn) || !isLoggedIn),
      map(([isLoggedIn, cartUser, user]) => {
        if (!isLoggedIn) {
          return this.handleAnonymousUser(cartUser);
        } else if (user && 'roles' in user) {
          return this.handleUserRole(user);
        }
        return isLoggedIn;
      })
    );
  }

  protected handleAnonymousUser(cartUser?: User): boolean | UrlTree {
    this.activeCartFacade.isGuestCart().pipe(map(resp =>{
      if(resp){
        return !!cartUser;
      }
    }))

    this.authRedirectService.saveCurrentNavigationUrl();
    if (this.checkoutConfigService.isGuestCheckout()) {
      return this.router.createUrlTree(
        [this.semanticPathService.get('login')],
        { queryParams: { forced: true } }
      );
    } else {
      return this.router.parseUrl(this.semanticPathService.get('login'));
    }
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
