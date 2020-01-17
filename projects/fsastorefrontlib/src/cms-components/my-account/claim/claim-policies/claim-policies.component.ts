import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AuthService, OccConfig, TranslationService } from '@spartacus/core';
import { Subscription, Observable, combineLatest } from 'rxjs';
import { take, map } from 'rxjs/operators';
import {
  ClaimService,
  PolicyService,
} from '../../../../core/my-account/services';
import * as fromPolicyStore from '../../../../core/my-account/store';
import { DomSanitizer } from '@angular/platform-browser';
import { genericIcons } from '../../../../assets/icons/generic-icons';
import { Card } from '@spartacus/storefront';

@Component({
  selector: 'fsa-claim-policies',
  templateUrl: './claim-policies.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClaimPoliciesComponent implements OnInit, OnDestroy {
  constructor(
    protected store: Store<fromPolicyStore.UserState>,
    protected policyService: PolicyService,
    protected claimService: ClaimService,
    protected config: OccConfig,
    protected authService: AuthService,
    protected domSanitizer: DomSanitizer,
    protected translation: TranslationService,
  ) { }

  subscription = new Subscription();

  claimData$;
  claimPoliciesLoaded$;
  isSelected: number;

  ngOnInit() {
    // Fixing insurances_auto until:
    // we get the BE part returning real categoryCode
    // we create dynamic content for FNOL page
    this.policyService.loadClaimPolicies('insurances_auto');
    this.claimData$ = this.store.pipe(
      select(fromPolicyStore.getClaimPoliciesState)
    );
    this.claimPoliciesLoaded$ = this.store.pipe(
      select(fromPolicyStore.getClaimPoliciesLoaded)
    );
  }

  selectPolicy(policyId, contractId) {
    this.subscription.add(
      this.authService
        .getOccUserId()
        .pipe(take(1))
        .subscribe(occUserId =>
          this.claimService.setSelectedPolicy(occUserId, policyId, contractId)
        )
    );
  }

  cardContent(cardObject): Observable<any> {
    return combineLatest([
      this.translation.translate('policy.policy'),
      this.translation.translate('claim.vehicleMake'),
      this.translation.translate('claim.vehicleModel'),
    ]).pipe(
      map(
        ([
          policy,
          vahicleMake,
          vehicleModel,
        ]) => {
          return this.createCard(cardObject, {
            policy,
            vahicleMake,
            vehicleModel
          });
        }
      )
    );
  }

  createCard(cardValue, cardObject) {
    return {
      header: 'Proba proba',
      title: `${cardObject.policy}`,
      // textBold: cardObject.categoryData.name,
      text: [
        `${cardObject.vahicleMake}: ${cardValue.insuredObjects[0].insuredObjectItems[0].value}`,
        `${cardObject.vehicleModel}: ${cardValue.insuredObjects[0].insuredObjectItems[1].value}`
      ],
      img: cardValue.insuredObjects[0].insuredObjectType.code
    };
  }

  getImagelink() {
    return this.domSanitizer.bypassSecurityTrustUrl(genericIcons.document);
  }

  public getBaseUrl() {
    return this.config.backend.occ.baseUrl || '';
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
