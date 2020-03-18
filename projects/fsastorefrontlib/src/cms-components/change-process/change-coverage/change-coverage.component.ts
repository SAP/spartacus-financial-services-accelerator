import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AbstractChangeProcessStepComponent } from '../abstract-change-process-step/abstract-change-process-step.component';

@Component({
  selector: 'fsa-change-coverage',
  templateUrl: './change-coverage.component.html',
})
export class ChangeCoverageComponent extends AbstractChangeProcessStepComponent
  implements OnInit, OnDestroy {
  changeRequest$: Observable<any>;
  currentDate;

  includedCoverages = [];
  potentialCoverages = [];

  private sub = new Subscription();

  ngOnInit() {
    super.ngOnInit();
    this.currentDate = new Date().toISOString().substr(0, 10);
    this.sub.add(
      this.changeRequest$
        .pipe(
          map(changeRequestData => {
            if (
              changeRequestData.insurancePolicy &&
              changeRequestData.insurancePolicy.optionalProducts &&
              !this.isSimulated(changeRequestData)
            ) {
              this.populatelCoverages(
                changeRequestData.insurancePolicy.optionalProducts
              );
            }
          })
        )
        .subscribe()
    );
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
    this.simulateChangeRequest({
      requestId: changeRequestData.requestId,
      insurancePolicy: {
        optionalProducts: optionalProducts,
      },
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
