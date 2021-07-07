import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { OccConfig, RoutingService, WindowRef } from '@spartacus/core';
import { FileService } from '@spartacus/dynamicforms';
import { PolicyService } from '../../../../core/my-account/facade/policy.service';
import { ChangeRequestService } from './../../../../core/change-request/facade/change-request.service';
import { AllowedFSRequestType } from './../../../../occ/occ-models';
import { FSTranslationService } from '../../../../core/i18n/facade';
import { ORIGIN_POLICIES_PAGE } from '../../../../shared';

@Component({
  selector: 'cx-fs-policy-details',
  templateUrl: './policy-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PolicyDetailsComponent implements OnInit, OnDestroy {
  constructor(
    protected routingService: RoutingService,
    protected policyService: PolicyService,
    protected config: OccConfig,
    protected changeRequestService: ChangeRequestService,
    protected translationService: FSTranslationService,
    protected fileService: FileService,
    protected activatedRoute: ActivatedRoute,
    private winRef: WindowRef
  ) {}

  policy$;
  subscription = new Subscription();
  baseUrl: string;
  originPolicyPage = this.winRef.sessionStorage.getItem(ORIGIN_POLICIES_PAGE);

  ngOnInit(): void {
    if (!this.originPolicyPage) {
      this.redirectToChangeCoverage();
    }
    this.policy$ = this.policyService.getPolicyDetails();
    this.baseUrl = this.config.backend.occ.baseUrl || '';
    this.loadPolicyDetails();
  }

  loadPolicyDetails() {
    this.subscription.add(
      this.activatedRoute.params
        .pipe(
          filter(routingData => routingData.policyId),
          map(routingData => {
            this.policyService.loadPolicyDetails(
              routingData.policyId,
              routingData.contractId
            );
          })
        )
        .subscribe()
    );
  }

  isChangeAllowed(
    allowedFSRequestTypes: AllowedFSRequestType[],
    requestType: string,
    startDate: string
  ): boolean {
    if (startDate && allowedFSRequestTypes) {
      const formatedStartDate = new Date(startDate).toISOString().substr(0, 10);
      const formattedCurrentDate = new Date().toISOString().substr(0, 10);
      return (
        formatedStartDate <= formattedCurrentDate &&
        allowedFSRequestTypes
          .filter(allowedRequestType => allowedRequestType.requestType)
          .map(allowedRequestType => allowedRequestType.requestType.code)
          .indexOf(requestType) > -1
      );
    }
    return false;
  }

  changePolicyDetails(policyId, contractId, changeRequestType) {
    this.changeRequestService.createChangeRequest(
      policyId,
      contractId,
      changeRequestType
    );
    this.subscription.add(
      this.changeRequestService
        .getChangeRequest()
        .pipe(
          map(changeRequest => {
            if (changeRequest && changeRequest.configurationSteps) {
              this.routingService.go({
                cxRoute: changeRequest.configurationSteps[0].pageLabelOrId,
              });
            }
          })
        )
        .subscribe()
    );
  }

  redirectToChangeCoverage() {
    this.subscription.add(
      this.activatedRoute.params.subscribe(params => {
        this.changePolicyDetails(
          params.policyId,
          params.contractId,
          'FSCOVERAGE_CHANGE'
        );
      })
    );
  }

  getDocument(document) {
    this.subscription.add(this.fileService.getDocument(document).subscribe());
  }

  getTranslation(translationGroup: string, translationKey: string): string {
    return this.translationService.getTranslationValue(
      ['policy.details', translationGroup],
      translationKey
    );
  }

  isAddingOfInsuredObjectAllowed(
    insuredObject: any,
    maxNumberOfInsuredObjects: number
  ): boolean {
    const currentNumberOfInsuredObjects =
      insuredObject?.childInsuredObjectList?.insuredObjects?.length;
    return maxNumberOfInsuredObjects > currentNumberOfInsuredObjects;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
