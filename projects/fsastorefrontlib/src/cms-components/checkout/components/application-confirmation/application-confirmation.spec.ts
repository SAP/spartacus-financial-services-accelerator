import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { RoutingService } from '@spartacus/core';
import { ApplicationConfirmationComponent } from './application-confirmation.component';

const mockImageSrc = 'data:image/svg+xml;base64, sampleImageCode';

class MockDomSanitizer {
  bypassSecurityTrustUrl() {
    return mockImageSrc;
  }
  sanitize() {}
}

class MockRoutingService {}

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
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
