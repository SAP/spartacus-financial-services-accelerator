import { Component, OnDestroy, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AbstractChangeProcessStepComponent } from '../abstract-change-process-step/abstract-change-process-step.component';

@Component({
  selector: 'cx-fs-change-coverage',
  templateUrl: './change-coverage.component.html',
})
export class ChangeCoverageComponent extends AbstractChangeProcessStepComponent
  implements OnInit, OnDestroy {
  currentDate = new Date();
  optionalCoverages = [];
  checkCoverageChanged = [];

  ngOnInit() {
    super.ngOnInit();
    this.subscription.add(
      this.changeRequest$
        .pipe(
          map(changeRequestData => {
            const optionalProducts = changeRequestData?.insurancePolicy?.optionalProducts.filter(
              optionalProduct => !optionalProduct.isMandatory
            );
            if (optionalProducts && !this.isSimulated(changeRequestData)) {
              this.optionalCoverages = [...optionalProducts];
            }
          })
        )
        .subscribe()
    );
  }

  resolveCoverageChange(index: number) {
    if (!this.checkCoverageChanged.includes(index)) {
      this.checkCoverageChanged.push(index);
    } else {
      this.checkCoverageChanged.splice(
        this.checkCoverageChanged.findIndex(idx => idx === index),
        1
      );
    }
  }

  addCoverage(idx: number) {
    this.resolveCoverageChange(idx);
    const isIncluded = { ...this.optionalCoverages[idx] };
    isIncluded.coverageIsIncluded = true;
    this.optionalCoverages = this.optionalCoverages.map(
      (potentialCoverage, index) =>
        idx !== index ? potentialCoverage : isIncluded
    );
  }

  removeCoverage(idx: number) {
    this.resolveCoverageChange(idx);
    const notIncluded = { ...this.optionalCoverages[idx] };
    notIncluded.coverageIsIncluded = false;
    this.optionalCoverages = this.optionalCoverages.map(
      (potentialCoverage, index) =>
        idx !== index ? potentialCoverage : notIncluded
    );
  }

  simulateChanges(changeRequestData) {
    if (this.checkCoverageChanged.length > 0) {
      const optionalProducts = [];
      this.optionalCoverages.forEach(coverage => {
        if (coverage.coverageIsIncluded) {
          optionalProducts.push({
            coverageIsIncluded: coverage.coverageIsIncluded,
            coverageProduct: {
              code: coverage.coverageProduct.code,
            },
          });
        }
      });
      this.simulateChangeRequest({
        requestId: changeRequestData.requestId,
        insurancePolicy: {
          optionalProducts: optionalProducts,
        },
        configurationSteps: changeRequestData.configurationSteps,
      });
    }
  }

  toggleCoverage(idx: number) {
    if (!this.checkCoverageChanged.includes(idx)) {
      this.checkCoverageChanged.push(idx);
    } else {
      this.checkCoverageChanged.splice(idx, 1);
    }
  }
}
