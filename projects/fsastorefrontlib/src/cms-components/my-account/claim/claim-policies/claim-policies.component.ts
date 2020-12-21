import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { OccConfig, TranslationService, UserIdService } from '@spartacus/core';
import { Card } from '@spartacus/storefront';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { genericIcons } from '../../../../assets/icons/generic-icons';
import {
  ClaimService,
  PolicyService,
} from '../../../../core/my-account/facade';

@Component({
  selector: 'cx-fs-claim-policies',
  templateUrl: './claim-policies.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClaimPoliciesComponent implements OnInit, OnDestroy {
  constructor(
    protected claimService: ClaimService,
    protected config: OccConfig,
    protected userIdService: UserIdService,
    protected domSanitizer: DomSanitizer,
    protected translation: TranslationService,
    protected policyService: PolicyService
  ) {}

  subscription = new Subscription();

  claimData$: Observable<any>;
  claimPoliciesLoaded$;
  selectedPolicyId;
  selectedIndex: number;
  baseUrl: string;

  ngOnInit() {
    // TODO: handle loading claims for every category
    this.policyService.loadClaimPolicies('insurances_auto');
    this.claimData$ = this.claimService.getClaimPolicies();
    this.claimPoliciesLoaded$ = this.claimService.getClaimPoliciesLoaded();
    this.baseUrl = this.config.backend.occ.baseUrl || '';
  }

  selectPolicy(index, policyId, contractId) {
    this.selectedIndex = this.selectedIndex === index ? -1 : index;
    this.subscription.add(
      this.userIdService
        .getUserId()
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
      this.translation.translate('fscommon.vehicleMake'),
      this.translation.translate('fscommon.vehicleModel'),
      this.translation.translate('fscommon.select'),
      this.translation.translate('paymentCard.selected'),
    ]).pipe(
      map(([policy, vehicleMake, vehicleModel, commonSelect, selected]) => {
        return this.createCard(idx, cardObject, {
          policy,
          vehicleMake,
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
        `${cardContent.vehicleMake}: ${cardObject.insuredObjectList.insuredObjects[0].insuredObjectItems[0].value}`,
        `${cardContent.vehicleModel}: ${cardObject.insuredObjectList.insuredObjects[0].insuredObjectItems[1].value}`,
      ],
      img: cardObject.insuredObjectList.insuredObjects[0].insuredObjectType,
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

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
