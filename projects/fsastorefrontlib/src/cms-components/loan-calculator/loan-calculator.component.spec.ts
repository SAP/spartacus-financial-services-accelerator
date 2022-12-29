import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule, MockTranslatePipe } from '@spartacus/core';
import { LoanCalculatorComponent } from './loan-calculator.component';
import { LoanCalculatorService } from './services/loan-calculator.service';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CmsComponentData } from '@spartacus/storefront';

class MockCreateLoanCalculatorComponentService {
  getAnnuity() {}
  getRepaymentFrequencies() {}
}

describe('LoanCalculatorComponent', () => {
  let component: LoanCalculatorComponent;
  let fixture: ComponentFixture<LoanCalculatorComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, CommonModule, ReactiveFormsModule],
        declarations: [LoanCalculatorComponent],
        providers: [LoanCalculatorService],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
