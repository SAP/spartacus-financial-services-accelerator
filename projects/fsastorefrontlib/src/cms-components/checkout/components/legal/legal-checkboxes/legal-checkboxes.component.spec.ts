import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { I18nTestingModule, RoutingService } from '@spartacus/core';
import { of } from 'rxjs';
import { FSSteps } from '../../../../../occ/occ-models';
import { FSCheckoutService } from './../../../../../core/checkout/facade/checkout.service';
import { FSCheckoutConfigService } from './../../../../../core/checkout/services/checkout-config.service';
import { LegalCheckboxesComponent } from './legal-checkboxes.component';

const mockForm: FormGroup = new FormGroup({
  actOnMyBehalf: new FormControl(true, Validators.required),
  authorizedToAccept: new FormControl(true, Validators.required),
  readAndAgree: new FormControl(true, Validators.required),
  usePersonalData: new FormControl(true, Validators.required),
});

class MockActivatedRoute {
  params = of();
}

class MockRoutingService {
  go() {}
}

class MockCheckoutService {
  setLegalInformation() {}
}

class FSCheckoutConfigServiceStub {
  getNextCheckoutStepUrl() {}
  getPreviousCheckoutStepUrl() {}
}

const mockCategoryAndStep: FSSteps = {
  stepParameter: 'insurances_travel',
  step: 'category',
};

describe('LegalCheckboxesComponent', () => {
  let component: LegalCheckboxesComponent;
  let fixture: ComponentFixture<LegalCheckboxesComponent>;
  let routingService: RoutingService;
  let checkoutService: FSCheckoutService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, FormsModule],
        declarations: [LegalCheckboxesComponent],
        providers: [
          {
            provide: RoutingService,
            useClass: MockRoutingService,
          },
          {
            provide: ActivatedRoute,
            useValue: MockActivatedRoute,
          },
          {
            provide: FSCheckoutConfigService,
            useClass: FSCheckoutConfigServiceStub,
          },
          {
            provide: FSCheckoutService,
            useClass: MockCheckoutService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalCheckboxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    routingService = TestBed.inject(RoutingService);
    checkoutService = TestBed.inject(FSCheckoutService);
    spyOn(routingService, 'go').and.stub();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should continue to next step', () => {
    component.navigateNext(mockCategoryAndStep, mockForm);
    expect(routingService.go).toHaveBeenCalled();
  });

  it('should go back to previous step', () => {
    component.navigateBack(mockCategoryAndStep);
    expect(routingService.go).toHaveBeenCalled();
  });

  it('should not continue to next step if form is invalid', () => {
    mockForm.get('actOnMyBehalf').setValue(null);
    component.navigateNext(mockCategoryAndStep, mockForm);
    expect(routingService.go).not.toHaveBeenCalled();
  });
});
