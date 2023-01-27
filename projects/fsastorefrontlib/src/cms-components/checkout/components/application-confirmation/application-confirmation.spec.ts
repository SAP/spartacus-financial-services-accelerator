import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import {
  GlobalMessageService,
  RouterState,
  RoutingService,
} from '@spartacus/core';
import { ApplicationConfirmationComponent } from './application-confirmation.component';
import { Observable, of } from 'rxjs';

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
  getRouterState(): Observable<any> {
    return of(mockRoutingData);
  }
  go() {}
}

class MockGlobalMessageService {
  add() {}
}

describe('ApplicationConfirmationComponent', () => {
  let component: ApplicationConfirmationComponent;
  let fixture: ComponentFixture<ApplicationConfirmationComponent>;
  let routingService: RoutingService;
  let globalMessageService: GlobalMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationConfirmationComponent],
      providers: [
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        {
          provide: DomSanitizer,
          useClass: MockDomSanitizer,
        },
      ],
    });

    fixture = TestBed.createComponent(ApplicationConfirmationComponent);
    component = fixture.componentInstance;
    routingService = TestBed.inject(RoutingService);
    globalMessageService = TestBed.inject(GlobalMessageService);
    localStorage.setItem('bankingApplicationPrice', '€100');
    spyOn(routingService, 'go').and.callThrough();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should get price from localstorage', () => {
    spyOn(routingService, 'getRouterState').and.callThrough();
    spyOn(localStorage, 'getItem').and.callThrough();
    component.ngOnInit();
    expect(localStorage.getItem).toHaveBeenCalled();
    expect(routingService.go).not.toHaveBeenCalled();
  });

  it('should check if quoteId and productName are not provided', () => {
    spyOn(routingService, 'getRouterState').and.returnValue(
      of({
        state: {
          params: {},
        },
      } as RouterState)
    );
    spyOn(localStorage, 'getItem').and.callThrough();
    component.ngOnInit();
    expect(localStorage.getItem).not.toHaveBeenCalled();
  });

  it('should navigate to quote details page', () => {
    component.navigateQuoteDetails();
    expect(routingService.go).toHaveBeenCalled();
  });

  it('should navigate to inbox page', () => {
    component.navigateInbox();
    expect(routingService.go).toHaveBeenCalled();
  });
});
