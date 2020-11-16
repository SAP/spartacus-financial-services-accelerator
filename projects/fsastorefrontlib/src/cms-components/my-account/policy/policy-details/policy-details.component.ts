import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { OccConfig, RoutingService } from '@spartacus/core';
import { saveAs } from 'file-saver';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { PolicyService } from '../../../../core/my-account/facade/policy.service';
import { ChangeRequestService } from './../../../../core/change-request/facade/change-request.service';
import { DocumentService } from './../../../../core/document/facade/document.service';
import { AllowedFSRequestType } from './../../../../occ/occ-models';
import { FSTranslationService } from '../../../../core/i18n/facade';

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
    protected documentService: DocumentService,
    protected translationService: FSTranslationService
  ) {}

  policy$;
  subscription = new Subscription();

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
  }

  getBaseUrl() {
    return this.config.backend.occ.baseUrl || '';
  }

  isChangeAllowed(
    allowedFSRequestTypes: AllowedFSRequestType[],
    requestType: string,
    startDate: string
  ): boolean {
    if (startDate && allowedFSRequestTypes) {
      const formatedStartDate = new Date(startDate).toISOString().substr(0, 10);
      const formatedActualDate = new Date().toISOString().substr(0, 10);
      return (
        formatedStartDate <= formatedActualDate &&
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

  getDocument(documentId, documentName, event) {
    event.preventDefault();
    this.subscription.add(
      this.documentService
        .getDocumentById(documentId)
        .pipe(
          map(document => {
            saveAs(document, documentName + '.pdf');
          })
        )
        .subscribe()
    );
  }

  getTranslation(translationGroup: string, translationKey: string): string {
    return this.translationService.getTranslationValue(
      ['policy.details', translationGroup],
      translationKey
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
