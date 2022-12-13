import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import {
  ActiveCartService,
  I18nTestingModule,
  OCC_USER_ID_CURRENT,
  RoutingService,
  UserIdService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { FSSteps } from '../../../../../occ/occ-models';
import { FSCartService } from './../../../../../core/cart/facade/cart.service';
import { FSCheckoutConfigService } from './../../../../../core/checkout/services/checkout-config.service';
import { FSCheckoutService } from '../../../../../core/checkout/facade/checkout.service';
import { SelectIdentificationTypeComponent } from './select-identification.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

const activeCartCode = 'testCartCode';
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
  setIdentificationType() {}
}

class MockCartService {
  removeCart() {}
}

class MockActiveCartService {
  getActiveCartId(): Observable<string> {
    return of(activeCartCode);
  }
}

class MockUserIdService {
  getUserId(): Observable<string> {
    return of(OCC_USER_ID_CURRENT);
  }
}

describe('SelectIdentificationTypeComponent', () => {
  let component: SelectIdentificationTypeComponent;
  let fixture: ComponentFixture<SelectIdentificationTypeComponent>;
  let routingService: RoutingService;
  let mockActiveCartService: ActiveCartService;
  let mockUserIdService: UserIdService;
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
            provide: ActiveCartService,
            useClass: MockActiveCartService,
          },
          { provide: UserIdService, useClass: MockUserIdService },
          {
            provide: FSCheckoutService,
            useClass: MockFSCheckoutService,
          },
        ],
      }).compileComponents();
      mockActiveCartService = TestBed.inject(ActiveCartService);
      mockUserIdService = TestBed.inject(UserIdService);
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

  it('should not set identification type if it is not selected', () => {
    component.selected = null;
    component.setIdentificationType();
    expect(routingService.go).not.toHaveBeenCalled();
  });
});
