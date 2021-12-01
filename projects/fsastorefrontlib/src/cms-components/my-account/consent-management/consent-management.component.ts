import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AnonymousConsentsConfig,
  AnonymousConsentsService,
  AuthService,
  ConsentTemplate,
  GlobalMessageService,
  UserConsentService,
  UserIdService,
} from '@spartacus/core';
import { ConsentManagementComponent } from '@spartacus/storefront';
import { ConsentService } from 'projects/fsastorefrontlib/src/core/my-account/facade/consent.service';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { StateWithMyAccount } from '../../../core/my-account/store/my-account-state';

@Component({
  selector: 'cx-fs-consent-management',
  templateUrl: './consent-management.component.html',
})
export class FSConsentManagementComponent extends ConsentManagementComponent
  implements OnInit, OnDestroy {
  constructor(
    protected userConsentService: UserConsentService,
    protected globalMessageService: GlobalMessageService,
    protected anonymousConsentsConfig: AnonymousConsentsConfig,
    protected anonymousConsentsService: AnonymousConsentsService,
    protected authService: AuthService,
    protected fsConsentService: ConsentService,
    protected userIdService: UserIdService
  ) {
    super(
      userConsentService,
      globalMessageService,
      anonymousConsentsConfig,
      anonymousConsentsService,
      authService
    );
  }

  private subscription = new Subscription();
  consents$: Observable<
    StateWithMyAccount
  > = this.fsConsentService.getConsents();

  consentTemplates$: Observable<
    ConsentTemplate[]
  > = this.userConsentService.getConsents();

  ngOnInit(): void {
    super.ngOnInit();
    this.subscription.add(
      this.userIdService
        .getUserId()
        .pipe(take(1))
        .subscribe(occUserId => {
          this.fsConsentService.loadConsents(occUserId);
        })
    );
    this.userConsentService.loadConsents();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
