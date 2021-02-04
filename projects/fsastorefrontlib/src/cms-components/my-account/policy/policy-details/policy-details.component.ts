import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { OccConfig, RoutingService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { PolicyService } from '../../../../core/my-account/facade/policy.service';
import { ChangeRequestService } from './../../../../core/change-request/facade/change-request.service';
import { AllowedFSRequestType } from './../../../../occ/occ-models';
import { FSTranslationService } from '../../../../core/i18n/facade';
import { FileService } from '@spartacus/dynamicforms';

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
    protected fileService: FileService
  ) {}

  policy$;
  subscription = new Subscription();
  baseUrl: string;

  ngOnInit(): void {
    this.subscription.add(
      this.routingService
        .getRouterState()
        .pipe(
          map(routingData => {
            const policyId = routingData.state.params.policyId;
            const contractId = routingData.state.params.contractId;
            if (policyId && contractId) {
              this.policyService.loadPolicyDetails(policyId, contractId);
            }
          })
        )
        .subscribe()
    );
    this.policy$ = this.policyService.getPolicyDetails();
    this.baseUrl = this.config.backend.occ.baseUrl || '';
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
