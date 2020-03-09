import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import createSpy = jasmine.createSpy;
import { Observable, of } from 'rxjs';
import { I18nTestingModule, RoutingService } from '@spartacus/core';
import { AccordionModule } from '../../../shared/accordion/accordion.module';
import { FSUserRequest } from '../../../occ/occ-models';
import { FNOLSummaryComponent } from './fnol-summary.component';
import { By } from '@angular/platform-browser';
import { ClaimService } from './../../../core/my-account/facade/claim.service';

class MockRoutingService {
  go = createSpy();
}

const mockClaimRequest: Observable<FSUserRequest> = of({
  claimNumber: 'testNumber',
  requestId: 'testRequestId',
  configurationSteps: [
    {
      name: 'step1',
      sequenceNumber: '1',
      pageLabelorId: 'configurationStep1',
      stepContent: {
        contentData: {
          entry: [
            {
              key: 'whatHappened',
              value: 'accident',
            },
          ],
        },
      },
    },
    {
      name: 'step2',
      sequenceNumber: '2',
      pageLabelorId: 'configurationStep2',
      stepContent: {
        contentData: {
          entry: [
            {
              key: 'howAccidentOccured',
              value: 'accident occurance explanation',
            },
          ],
        },
      },
    },
  ],
});

class MockClaimService {
  createClaim = createSpy();

  getCurrentClaim() {
    return mockClaimRequest;
  }
}

describe('FNOLSummaryComponent', () => {
  let component: FNOLSummaryComponent;
  let fixture: ComponentFixture<FNOLSummaryComponent>;
  let mockRoutingService: MockRoutingService;
  let mockClaimService: MockClaimService;

  beforeEach(async(() => {
    mockRoutingService = new MockRoutingService();
    mockClaimService = new MockClaimService();
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, AccordionModule],
      providers: [
        { provide: RoutingService, useValue: mockRoutingService },
        { provide: ClaimService, useValue: mockClaimService },
      ],
      declarations: [FNOLSummaryComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FNOLSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create user request summary component', () => {
    expect(component).toBeTruthy();
  });

  it('should create configuration steps accordions', () => {
    const accordionElement = fixture.debugElement.query(By.css('.accordion'));
    expect(accordionElement).toBeTruthy();
  });

  it('should load configuration step content', () => {
    const contentDataItems = fixture.debugElement.query(
      By.css('.accordion-list-item')
    );
    expect(contentDataItems).toBeTruthy();
  });
});
