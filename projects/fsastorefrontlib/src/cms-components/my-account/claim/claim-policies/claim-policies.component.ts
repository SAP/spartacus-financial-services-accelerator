import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService, OccConfig, TranslationService } from '@spartacus/core';
import { Card } from '@spartacus/storefront';
import { Subscription, Observable, combineLatest } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { ClaimService } from '../../../../core/my-account/facade';
import { PolicyService } from '../../../../core/my-account/facade';
import * as fromPolicyStore from '../../../../core/my-account/store';
import { genericIcons } from '../../../../assets/icons/generic-icons';

@Component({
  selector: 'fsa-claim-policies',
  templateUrl: './claim-policies.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClaimPoliciesComponent implements OnInit, OnDestroy {
  constructor(
    protected store: Store<fromPolicyStore.UserState>,
    protected claimService: ClaimService,
    protected config: OccConfig,
    protected authService: AuthService,
    protected domSanitizer: DomSanitizer,
    protected translation: TranslationService,
    protected policyService: PolicyService
  ) {}

  subscription = new Subscription();

  claimData$: Observable<any>;
  claimPoliciesLoaded$;
  selectedPolicyId;
  selectedIndex: number;

  ngOnInit() {
    // TODO: handle loading claims for every category
    this.policyService.loadClaimPolicies('insurances_auto');

    this.claimData$ = this.store.pipe(
      select(fromPolicyStore.getClaimPoliciesState)
    );
    this.claimPoliciesLoaded$ = this.store.pipe(
      select(fromPolicyStore.getClaimPoliciesLoaded)
    );
  }

  selectPolicy(index, policyId, contractId) {
    this.selectedIndex = this.selectedIndex === index ? -1 : index;
    this.subscription.add(
      this.authService
        .getOccUserId()
        .pipe(take(1))
        .subscribe(occUserId => {
          if (this.selectedPolicyId !== policyId) {
            this.selectedPolicyId = policyId;
            this.claimService.setSelectedPolicy(
              occUserId,
              policyId,
              contractId
            );
          } else {
            this.selectedPolicyId = undefined;
            this.claimService.resetSelectedPolicy();
          }
        })
    );
  }

  cardContent(idx, cardObject): Observable<Card> {
    return combineLatest([
      this.translation.translate('policy.policy'),
      this.translation.translate('claim.vehicleMake'),
      this.translation.translate('claim.vehicleModel'),
      this.translation.translate('fscommon.select'),
      this.translation.translate('paymentCard.selected'),
    ]).pipe(
      map(([policy, vahicleMake, vehicleModel, commonSelect, selected]) => {
        return this.createCard(idx, cardObject, {
          policy,
          vahicleMake,
          vehicleModel,
          commonSelect,
          selected,
        });
      })
    );
  }

  createCard(idx, cardObject, cardContent) {
    return {
      header:
        this.selectedIndex === idx && this.selectedPolicyId
          ? cardContent.selected
          : undefined,
      textBold: `${cardObject.categoryData.name} ${cardContent.policy}`,
      text: [
        `${cardContent.vahicleMake}: ${cardObject.insuredObjectList.insuredObjects[0].insuredObjectItems[0].value}`,
        `${cardContent.vehicleModel}: ${cardObject.insuredObjectList.insuredObjects[0].insuredObjectItems[1].value}`,
      ],
      img:
        cardObject.insuredObjectList.insuredObjects[0].insuredObjectType.code,
      actions: [
        {
          name:
            this.selectedIndex === idx && this.selectedPolicyId
              ? cardContent.selected
              : cardContent.commonSelect,
          event: 'send',
        },
      ],
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
