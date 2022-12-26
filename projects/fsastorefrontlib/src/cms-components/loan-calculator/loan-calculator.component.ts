import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CmsComponentData } from '@spartacus/storefront';

@Component({
  selector: 'cx-fs-loan-calculator',
  templateUrl: './loan-calculator.component.html',
})
export class LoanCalculatorComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    public componentData: CmsComponentData<any>,
  ) {}

  sliderForm: FormGroup;

  ngOnInit(): void {
    this.sliderForm = this.fb.group({
      annuity: [{ value: null, disabled: true }],
      loanAmount: [null],
      loanTerm: [null],
      interestLoanRate: [{ value: null, disabled: true }],
      repaymentFrequency: ['monthly', Validators.required],
    });
  }
}
