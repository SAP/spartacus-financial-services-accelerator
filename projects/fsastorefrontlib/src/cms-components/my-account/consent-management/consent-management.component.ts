import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsentTemplate, UserConsentService } from '@spartacus/core';
import { ConsentService } from 'projects/fsastorefrontlib/src/core/my-account/facade/consent.service';
import { Observable, Subscription } from 'rxjs';
import { StateWithMyAccount } from '../../../core/my-account/store/my-account-state';

@Component({
  selector: 'cx-fs-consent-management',
  templateUrl: './consent-management.component.html',
})
export class FSConsentManagementComponent implements OnInit, OnDestroy {
  constructor(
    protected fsConsentService: ConsentService,
    protected userConsentService: UserConsentService
  ) {}

  private subscription = new Subscription();
  consents$: Observable<StateWithMyAccount>;
  consentTemplates$: Observable<ConsentTemplate[]>;
  consentsLoaded$: Observable<boolean>;

  ngOnInit(): void {
    this.fsConsentService.loadConsents();
    this.userConsentService.loadConsents();
    this.consents$ = this.fsConsentService.getConsents();
    this.consentsLoaded$ = this.fsConsentService.getConsentsLoaded();
    this.consentTemplates$ = this.userConsentService.getConsents();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
