import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CmsComponentData } from '@spartacus/storefront';
import { CurrencyService } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { ICON_TYPE } from '@spartacus/storefront';
import { map, switchMap } from 'rxjs/operators';
import { LoanCalculatorService } from './services/loan-calculator.service';

@Component({
  selector: 'cx-fs-loan-calculator',
  templateUrl: './loan-calculator.component.html',
  providers: [LoanCalculatorService],
})
export class LoanCalculatorComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  currentCurrency$: Observable<string> = this.currencyService.getActive();

  isLoading = false;
  currentCurrency: string;
  repaymentFrequencies$: Observable<any>;
  iconTypes = ICON_TYPE;
  interestLoanRate: number;
  clearAllowed: boolean = false;

  sliderForm: FormGroup;
  inputRangeSteps: number = 1000;
  annuityAmount: string = undefined;

  constructor(
    private fb: FormBuilder,
    public componentData: CmsComponentData<any>,
    private loanCalculatorService: LoanCalculatorService,
    private currencyService: CurrencyService
  ) {}

  ngOnInit(): void {
    this.sliderForm = this.fb.group({
      annuity: [{ value: null, disabled: true }],
      loanAmount: [null],
      loanDuration: [null],
      interestLoanRate: [{ value: null, disabled: true }],
      repaymentFrequency: ['', Validators.required],
    });

    this.repaymentFrequencies$ = this.loanCalculatorService.getRepaymentFrequencies();

    this.subscriptions.add(
      this.currencyService
        .getActive()
        .subscribe(currency => (this.currentCurrency = currency))
    );
    this.sliderFormPatch();
  }

  sliderFormPatch() {
    this.sliderForm.patchValue({ repaymentFrequency: '' });
    this.subscriptions.add(
      this.componentData.data$
        .pipe(
          switchMap(componentData => {
            this.sliderForm.patchValue({
              loanAmount: +componentData.minAmount,
              loanDuration: +componentData.minDuration,
              interestLoanRate: `${componentData.loanRate}%`,
            });

            this.sliderForm.controls['loanAmount'].setValidators([
              Validators.required,
              Validators.min(+componentData.minAmount),
              Validators.max(+componentData.maxAmount),
            ]);

            this.sliderForm.controls['loanDuration'].setValidators([
              Validators.required,
              Validators.min(+componentData.minDuration),
              Validators.max(+componentData.maxDuration),
            ]);

            return this.loanCalculatorService.getAnnuity(
              this.sliderForm.value,
              componentData.product
            );
          }),
          map(resp => this.getAnnuityAmount(resp.price.oneTimeChargeEntries))
        )
        .subscribe(() => {
          this.sliderForm.patchValue({ annuity: `€0` });
        })
    );
  }

  changeLoanDuration(change: string, min: number, max: number) {
    if (change === 'decrease') {
      this.sliderForm.get('loanDuration').value - 1 >= min
        ? this.sliderForm.patchValue({
            loanDuration: this.sliderForm.get('loanDuration').value - 1,
          })
        : false;
    } else {
      this.sliderForm.get('loanDuration').value + 1 <= max
        ? this.sliderForm.patchValue({
            loanDuration: this.sliderForm.get('loanDuration').value + 1,
          })
        : false;
    }
  }

  changeLoanAmount(change: string, min: number, max: number) {
    if (change === 'decrease') {
      this.sliderForm.get('loanAmount').value - this.inputRangeSteps >= min
        ? this.sliderForm.patchValue({
            loanAmount:
              this.sliderForm.get('loanAmount').value - this.inputRangeSteps,
          })
        : false;
    } else {
      this.sliderForm.get('loanAmount').value + this.inputRangeSteps <= max
        ? this.sliderForm.patchValue({
            loanAmount:
              this.sliderForm.get('loanAmount').value + this.inputRangeSteps,
          })
        : false;
    }
  }

  calculateAnnuityAmount() {
    this.clearAllowed = true;
    this.subscriptions.add(
      this.componentData.data$
        .pipe(
          switchMap(componentData => {
            return this.loanCalculatorService.getAnnuity(
              this.sliderForm.value,
              componentData.product
            );
          }),
          map(resp => this.getAnnuityAmount(resp.price.oneTimeChargeEntries))
        )
        .subscribe(annuity => {
          this.annuityAmount = annuity;
          this.sliderForm.patchValue({ annuity }, { emitEvent: false });
        })
    );
  }

  setLoanAmount() {
    this.sliderForm.patchValue({
      loanAmount: this.sliderForm.get('loanAmount').value,
    });
  }

  setDurationAmount() {
    this.sliderForm.patchValue({
      loanDuration: this.sliderForm.get('loanDuration').value,
    });
  }

  clearAll() {
    this.sliderFormPatch();
    this.annuityAmount = undefined;
  }

  private getAnnuityAmount(
    oneTimeChargeEntries: any[],
    code: string = 'paynow'
  ): string {
    const foundEntry = oneTimeChargeEntries.find(
      oneTimeChargeEntry => oneTimeChargeEntry.billingTime.code === code
    );
    return foundEntry.price.formattedValue;
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }
}
