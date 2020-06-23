import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { I18nTestingModule, RoutingService } from '@spartacus/core';
import { of } from 'rxjs';
import { FSCheckoutConfigService } from './../../../../../core/checkout/services/checkout-config.service';
import { LegalCheckboxesComponent } from './legal-checkboxes.component';

class MockActivatedRoute {
  params = of();
}

class MockRoutingService {
  go() { }
}

class FSCheckoutConfigServiceStub {
  getNextCheckoutStepUrl() { }
  getPreviousCheckoutStepUrl() { }
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
    routingService = TestBed.inject(RoutingService);
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
