import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ChangeRequestService } from './../../../core/change-request/facade/change-request.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { FSStepData } from './../../../occ/occ-models/occ.models';
import { UserRequestNavigationService } from './../../../core/user-request/facade/user-request-navigation.service';
import { ActivatedRoute } from '@angular/router';
import { ChangeProcessStepComponent } from '../change-process-step/change-process-step.component';
import { changeRequest } from 'projects/fsastorefrontlib/src/assets/translations/en/changeRequest.en';

@Component({
  selector: 'fsa-change-coverage',
  templateUrl: './change-coverage.component.html',
})
export class ChangeCoverageComponent extends ChangeProcessStepComponent
  implements OnInit, OnDestroy {
  constructor(
    protected changeRequestService: ChangeRequestService,
    protected userRequestNavigationService: UserRequestNavigationService,
    protected activatedRoute: ActivatedRoute
  ) {
    super(userRequestNavigationService, activatedRoute);
  }

  changeRequest$: Observable<any>;
  currentDate;

  includedCoverages = [];
  potentialCoverages = [];

  private subscription = new Subscription();

  ngOnInit() {
    this.currentDate = new Date().toISOString().substr(0, 10);
    this.changeRequest$ = this.changeRequestService.getChangeRequest();
    this.subscription.add(
      this.changeRequest$
        .pipe(
          map(changeRequest => {
            if (
              changeRequest.insurancePolicy &&
              changeRequest.insurancePolicy.optionalProducts
            ) {
              this.populateSteps(changeRequest);
              if (this.isSimulated(changeRequest)) {
                this.userRequestNavigationService.continue(
                  this.configurationSteps,
                  this.activeStepIndex
                );
              } else {
                this.populatelCoverages(
                  changeRequest.insurancePolicy.optionalProducts
                );
              }
            }
          })
        )
        .subscribe()
    );
  }

  isSimulated(request: any) {
    return request.changedPolicy;
  }

  populatelCoverages(optionalProducts: any) {
    this.includedCoverages = [];
    this.potentialCoverages = [];
    optionalProducts.map(coverage => {
      if (coverage.coverageIsIncluded) {
        this.includedCoverages.push(coverage);
      } else {
        this.potentialCoverages.push(coverage);
      }
    });
  }

  addCoverage(coverage: any) {
    this.potentialCoverages.forEach(potentialCoverage => {
      if (
        potentialCoverage.coverageProduct.code === coverage.coverageProduct.code
      ) {
        potentialCoverage.coverageIsIncluded = true;
      }
    });
  }

  removeCoverage(coverage: any) {
    this.potentialCoverages.forEach(potentialCoverage => {
      if (
        potentialCoverage.coverageProduct.code === coverage.coverageProduct.code
      ) {
        potentialCoverage.coverageIsIncluded = false;
      }
    });
  }

  simulateChanges(changeRequestData) {
    const optionalProducts = [];
    this.potentialCoverages.forEach(coverage => {
      if (coverage.coverageIsIncluded) {
        optionalProducts.push({
          coverageIsIncluded: coverage.coverageIsIncluded,
          coverageProduct: {
            code: coverage.coverageProduct.code,
          },
        });
      }
    });
    this.changeRequestService.simulateChangeRequest({
      requestId: changeRequestData.requestId,
      insurancePolicy: {
        optionalProducts: optionalProducts,
      },
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
