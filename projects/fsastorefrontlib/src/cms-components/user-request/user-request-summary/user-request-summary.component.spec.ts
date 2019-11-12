import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import createSpy = jasmine.createSpy;
import { Observable, of } from 'rxjs';
import { I18nTestingModule, RoutingService } from '@spartacus/core';
import { AccordionModule } from '../../../../src/shared/accordion/accordion.module';
import { FSUserRequest } from '../../../../src/occ/occ-models';
import { UserRequestService } from '../../../../src/core/user-request/services';
import { UserRequestSummaryComponent } from './user-request-summary.component';

class MockRoutingService {
  go = createSpy();
}

const mockUserRequest: Observable<FSUserRequest> = of({
  requestId: 'testRequestId',
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
