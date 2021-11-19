import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ConsentTemplate,
  UserConsentService,
  UserIdService,
} from '@spartacus/core';
import { ConsentService } from 'projects/fsastorefrontlib/src/core/my-account/facade/consent.service';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { StateWithMyAccount } from '../../../core/my-account/store/my-account-state';

@Component({
  selector: 'cx-fs-consent-management',
  templateUrl: './consent-management.component.html',
})
export class FSConsentManagementComponent implements OnInit, OnDestroy {
  constructor(
    protected fsConsentService: ConsentService,
    protected userIdService: UserIdService,
    protected userConsentService: UserConsentService
  ) {}

  private subscription = new Subscription();
  consents$: Observable<
    StateWithMyAccount
  > = this.fsConsentService.getConsents();
  consentTemplates$: Observable<
    ConsentTemplate[]
  > = this.userConsentService.getConsents();

  ngOnInit(): void {
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
