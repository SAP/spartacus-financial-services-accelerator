import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { I18nTestingModule, RoutingService } from '@spartacus/core';
import { of } from 'rxjs';
import { FSSteps } from '../../../../../occ/occ-models';
import { FSCartService } from './../../../../../core/cart/facade/cart.service';
import { FSCheckoutConfigService } from './../../../../../core/checkout/services/checkout-config.service';
import { FSCheckoutService } from '../../../../../core/checkout/facade/checkout.service';
import { SelectIdentificationTypeComponent } from 'projects/fsastorefrontlib/src/cms-components';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

const mockCategoryAndStep: FSSteps = {
  stepParameter: 'insurances_travel',
  step: 'category',
};

const mockIdentificationType = {
  name: 'nearest_branch',
  icon: 'icon-bank',
};

class MockRoutingService {
  go() {}
}

class MockActivatedRoute {}

class MockFSCheckoutConfigServiceStub {
  previousStep = of(mockCategoryAndStep);
}

class MockFSCheckoutService {
  placeOrder() {}
  mockDeliveryMode() {}
  setIdentificationType() {
    return of(true);
  }
}

class MockCartService {}

describe('SelectIdentificationTypeComponent', () => {
  let component: SelectIdentificationTypeComponent;
  let fixture: ComponentFixture<SelectIdentificationTypeComponent>;
  let routingService: RoutingService;
  let el: DebugElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [SelectIdentificationTypeComponent],
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
            useClass: MockFSCheckoutConfigServiceStub,
          },
          {
            provide: FSCartService,
            useClass: MockCartService,
          },
          {
            provide: FSCheckoutService,
            useClass: MockFSCheckoutService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectIdentificationTypeComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
    routingService = TestBed.inject(RoutingService);
    spyOn(routingService, 'go').and.stub();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go back to previous step', () => {
    component.navigateBack(mockCategoryAndStep);
    expect(routingService.go).toHaveBeenCalled();
  });

  it('should set selected type', () => {
    fixture.detectChanges();
    const selectEl = el.query(By.css('.box-shadow')).nativeElement;
    selectEl.dispatchEvent(new Event('click'));
    expect(component.selected).toEqual(mockIdentificationType.name);
  });

  it('should set identification type', () => {
    component.selected = 'nearest_branch';
    fixture.detectChanges();
    const button = el.query(By.css('.primary-button')).nativeElement;
    button.click();
    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'orderConfirmation',
    });
  });
});
