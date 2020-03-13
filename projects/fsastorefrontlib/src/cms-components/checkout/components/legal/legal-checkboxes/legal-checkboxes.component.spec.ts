import { FormsModule } from '@angular/forms';
import { FSCheckoutConfigService } from './../../../../../core/checkout/services/fs-checkout-config.service';
import { ActivatedRoute } from '@angular/router';
import { I18nTestingModule, RoutingService } from '@spartacus/core';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { LegalCheckboxesComponent } from './legal-checkboxes.component';
import { of } from 'rxjs';
import { Type } from '@angular/core';

class MockActivatedRoute {
  params = of();
}

class MockRoutingService {
  go() {}
}

class FSCheckoutConfigServiceStub {
  getNextCheckoutStepUrl() {}
  getPreviousCheckoutStepUrl() {}
}

describe('LegalCheckboxesComponent', () => {
  let component: LegalCheckboxesComponent;
  let fixture: ComponentFixture<LegalCheckboxesComponent>;
  let routingService: RoutingService;

  beforeEach(async(() => {
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
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalCheckboxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    routingService = TestBed.get(RoutingService as Type<RoutingService>);
    spyOn(routingService, 'go').and.stub();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should continue to next step', () => {
    component.continue();
    expect(routingService.go).toHaveBeenCalled();
  });

  it('should go back to previous step', () => {
    component.back();
    expect(routingService.go).toHaveBeenCalled();
  });
});
