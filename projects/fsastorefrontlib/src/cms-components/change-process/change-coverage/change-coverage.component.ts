import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { AbstractChangeProcessStepComponent } from '../abstract-change-process-step/abstract-change-process-step.component';

@Component({
  selector: 'cx-fs-change-coverage',
  templateUrl: './change-coverage.component.html',
})
export class ChangeCoverageComponent extends AbstractChangeProcessStepComponent
  implements OnInit, OnDestroy {
  changeRequest$: Observable<any>;
  currentDate;

  optionalCoverages = [];
  initialOptionalCoverages = [];

  ngOnInit() {
    super.ngOnInit();
    this.currentDate = new Date();
    this.subscription.add(
      this.changeRequest$
        .pipe(
          map(changeRequestData => {
            this.optionalCoverages = [];
            const optionalProducts = changeRequestData?.insurancePolicy?.optionalProducts.filter(
              optionalProduct => !optionalProduct.isMandatory
            );
            if (optionalProducts && !this.isSimulated(changeRequestData)) {
              optionalProducts.map((coverage, index) => {
                const coverageCopy = { ...coverage, index };
                this.optionalCoverages.push(coverageCopy);
                this.initialOptionalCoverages.push({ ...coverageCopy });
              });
            }
          })
        )
        .subscribe()
    );
  }

  addCoverage(coverage: any) {
    this.optionalCoverages.forEach(potentialCoverage => {
      if (
        potentialCoverage.coverageProduct.code === coverage.coverageProduct.code
      ) {
        potentialCoverage.coverageIsIncluded = true;
      }
    });
    // console.log(this.optionalCoverages, 'optionalCoverages addCoverage');
  }

  removeCoverage(coverage: any) {
    this.optionalCoverages.forEach(potentialCoverage => {
      if (
        potentialCoverage.coverageProduct.code === coverage.coverageProduct.code
      ) {
        potentialCoverage.coverageIsIncluded = false;
      }
    });
    // console.log(this.optionalCoverages, 'optionalCoverages removeCoverage');
  }

  simulateChanges(changeRequestData) {
    console.log(changeRequestData, 'changeRequestData simulateChanges');
    if (this.isPolicyChanged()) {
      console.log('policy changed');
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
      console.log(optionalProducts, 'optionalProducts simulateChanges');
      console.log(this.optionalCoverages, 'optionalCoverages simulateChanges');
      this.simulateChangeRequest({
        requestId: changeRequestData.requestId,
        insurancePolicy: {
          optionalProducts: optionalProducts,
        },
        configurationSteps: changeRequestData.configurationSteps,
      });
    }
  }

  isPolicyChanged(): boolean {
    let isPolicyChanged = false;
    this.optionalCoverages.forEach((optionalCoverage, index) => {
      if (
        optionalCoverage &&
        this.initialOptionalCoverages[index] &&
        optionalCoverage.coverageIsIncluded !==
          this.initialOptionalCoverages[index].coverageIsIncluded
      ) {
        isPolicyChanged = true;
      }
    });
    return isPolicyChanged;
  }
}
