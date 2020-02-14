import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import createSpy = jasmine.createSpy;
import { Observable, of } from 'rxjs';
import { I18nTestingModule, RoutingService } from '@spartacus/core';
import { AccordionModule } from '../../../../src/shared/accordion/accordion.module';
import { FSUserRequest } from '../../../../src/occ/occ-models';
import { UserRequestService } from '../../../../src/core/user-request/facade';
import { UserRequestSummaryComponent } from './user-request-summary.component';
import { By } from '@angular/platform-browser';

class MockRoutingService {
  go = createSpy();
}

const mockUserRequest: Observable<FSUserRequest> = of({
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

class MockUserRequestService {
  createClaim = createSpy();

  getUserRequest() {
    return mockUserRequest;
  }
}

describe('UserRequestSummaryComponent', () => {
  let component: UserRequestSummaryComponent;
  let fixture: ComponentFixture<UserRequestSummaryComponent>;
  let mockRoutingService: MockRoutingService;
  let mockUserRequestService: MockUserRequestService;

  beforeEach(async(() => {
    mockRoutingService = new MockRoutingService();
    mockUserRequestService = new MockUserRequestService();
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, AccordionModule],
      providers: [
        { provide: RoutingService, useValue: mockRoutingService },
        { provide: UserRequestService, useValue: mockUserRequestService },
      ],
      declarations: [UserRequestSummaryComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRequestSummaryComponent);
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
