import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { RoutingService } from '@spartacus/core';
import { ApplicationConfirmationComponent } from './application-confirmation.component';
import { of } from 'rxjs';

const mockImageSrc = 'data:image/svg+xml;base64, sampleImageCode';

const mockRoutingData = {
  state: {
    params: {
      quoteId: 'testQuoteId',
      productName: 'testProductName',
    },
  },
};

class MockDomSanitizer {
  bypassSecurityTrustUrl() {
    return mockImageSrc;
  }
  sanitize() {}
}

class MockRoutingService {
  getRouterState() {
    return of(mockRoutingData);
  }
  go() {}
}

describe('ApplicationConfirmationComponent', () => {
  let component: ApplicationConfirmationComponent;
  let fixture: ComponentFixture<ApplicationConfirmationComponent>;
  let routingService: RoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationConfirmationComponent],
      providers: [
        { provide: RoutingService, useClass: MockRoutingService },
        {
          provide: DomSanitizer,
          useClass: MockDomSanitizer,
        },
      ],
    });

    fixture = TestBed.createComponent(ApplicationConfirmationComponent);
    component = fixture.componentInstance;
    routingService = TestBed.inject(RoutingService);
    localStorage.setItem('bankingApplicationPrice', '€100');
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should navigate to quote details page', () => {
    spyOn(routingService, 'go').and.callThrough();
    component.navigateQuoteDetails();
    expect(routingService.go).toHaveBeenCalled();
  });

  it('should navigate to inbox page', () => {
    spyOn(routingService, 'go').and.callThrough();
    component.navigateInbox();
    expect(routingService.go).toHaveBeenCalled();
  });
});
