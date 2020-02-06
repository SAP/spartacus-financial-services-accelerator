import { PipeTransform, Pipe } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { RoutingService, I18nTestingModule } from '@spartacus/core';
import { Observable, BehaviorSubject, of } from 'rxjs';

import { ContactAgentFormComponent } from './contact-agent-form.component';
import { OccAgentAdapter } from '../../../occ/services/agent/occ-agent.adapter';
import { UserRequestService } from '../../../core/user-request/services';

const mockedAgentID = ['testAgent1@test.com'];
const mockedUserDetails = {
  firstName: 'Test',
  lastName: 'Testera',
  email: 'test@testera.com'
};

@Pipe({
  name: 'cxUrl',
})

class MockUrlPipe implements PipeTransform {
  transform() { }
}

class MockedUserService {
  getUserDetails() {
    return of(mockedUserDetails);
  }
}

class MockOccAgentAdapter {
  getAgentByID(): Observable<Object> {
    return new BehaviorSubject(mockedAgentID);
  }
}

describe('ContactAgentFormComponent', () => {
  let component: ContactAgentFormComponent;
  let fixture: ComponentFixture<ContactAgentFormComponent>;
  let mockOccAgentAdapter: MockOccAgentAdapter;
  let mockedUserService: MockedUserService;

  beforeEach(async(() => {
    mockOccAgentAdapter = new MockOccAgentAdapter();
    mockedUserService = new MockedUserService();
    TestBed.configureTestingModule({
      declarations: [ContactAgentFormComponent, MockUrlPipe],
      imports: [I18nTestingModule, RouterTestingModule, ReactiveFormsModule],
      providers: [
        {
          provide: RoutingService,
          useValue: { go: jasmine.createSpy() },
        },
        {
          provide: OccAgentAdapter,
          useValue: mockOccAgentAdapter,
        },
        {
          provide: UserRequestService,
          useValue: mockedUserService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactAgentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
