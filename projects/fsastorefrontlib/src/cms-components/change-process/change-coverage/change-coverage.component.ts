import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ChangeRequestService } from './../../../core/change-request/facade/change-request.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { FSStepData } from './../../../occ/occ-models/occ.models';
import { UserRequestNavigationService } from './../../../core/user-request/facade/user-request-navigation.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'fsa-change-coverage',
  templateUrl: './change-coverage.component.html',
})
export class ChangeCoverageComponent implements OnInit, OnDestroy {
  constructor(
    protected changeRequestService: ChangeRequestService,
    protected userRequestNavigationService: UserRequestNavigationService,
    protected activatedRoute: ActivatedRoute
  ) {}

  changeRequest$: Observable<any>;
  currentDate;

  includedCoverages = [];
  potentialCoverages = [];
  configurationSteps: FSStepData[];
  activeStepIndex: number;

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
              this.includedCoverages = [];
              this.potentialCoverages = [];
              this.populateStepsAndNavigate(changeRequest);
              changeRequest.insurancePolicy.optionalProducts.map(coverage => {
                if (coverage.coverageIsIncluded) {
                  this.includedCoverages.push(coverage);
                } else {
                  this.potentialCoverages.push(coverage);
                }
              });
            }
          })
        )
        .subscribe()
    );
  }

  populateStepsAndNavigate(changeRequest) {
    this.configurationSteps = this.userRequestNavigationService.getConfigurationSteps(
      changeRequest
    );
    const activeStepData = this.userRequestNavigationService.getActiveStep(
      this.configurationSteps,
      this.activatedRoute.routeConfig.path
    );
    this.activeStepIndex = this.configurationSteps.indexOf(activeStepData);

    if (changeRequest.changedPolicy) {
      this.userRequestNavigationService.continue(
        this.configurationSteps,
        this.activeStepIndex
      );
    }
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

  simulateChanges(changeRequest) {
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
      requestId: changeRequest.requestId,
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
