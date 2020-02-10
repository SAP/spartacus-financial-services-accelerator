import { PipeTransform, Pipe, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  RoutingService,
  I18nTestingModule,
  UserService,
} from '@spartacus/core';
import { Observable, BehaviorSubject, of } from 'rxjs';

import { ContactAgentFormComponent } from './contact-agent-form.component';
import { OccAgentAdapter } from '../../../occ/services/agent/occ-agent.adapter';
import { AgentSearchService } from '../../../core/agent/services/agent-search.service';

const mockedAgentID = ['testAgent1@test.com'];
const mockedUserDetails = {
  firstName: 'Test',
  lastName: 'Testera',
  uid: 'test@testera.com',
};

class ActivatedRouteMock {
  paramsSubscriptionHandler: Function;

  params = {
    subscribe: (observer: Function) => {
      this.paramsSubscriptionHandler = observer;
    },
  };
}
const agentParams = 'agent@test.com';

const mockAgentSearchService = {
  getAgentByID: jasmine.createSpy().and.returnValue(of({})),
};

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

class MockedUserService {
  get() {
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
  let userService: UserService;
  let activatedRoute: ActivatedRouteMock;
  let agentSearchService: AgentSearchService;

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
          provide: UserService,
          useValue: mockedUserService,
        },
        {
          provide: AgentSearchService,
          useValue: mockAgentSearchService,
        },
        {
          provide: ActivatedRoute,
          useClass: ActivatedRouteMock,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactAgentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = TestBed.get(UserService as Type<UserService>);
    activatedRoute = TestBed.get(ActivatedRoute as Type<ActivatedRoute>);
    agentSearchService = TestBed.get(AgentSearchService as Type<
      AgentSearchService
    >);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the user details', () => {
    spyOn(userService, 'get').and.returnValue(of(mockedUserDetails));
    component.ngOnInit();
    fixture.detectChanges();
    expect(userService.get).toHaveBeenCalled();
  });

  it('should NOT get the user details', () => {
    spyOn(userService, 'get').and.returnValue(of(undefined));
    component.ngOnInit();
    fixture.detectChanges();
    expect(userService.get).toHaveBeenCalled();
  });

  it('should return an agent with agent params', () => {
    activatedRoute.paramsSubscriptionHandler({ params: agentParams });

    expect(agentSearchService.getAgentByID).toHaveBeenCalled();
  });

  it('should unsubscribe from any subscriptions when destroyed', () => {
    const subscriptions = component['subscription'];
    spyOn(subscriptions, 'unsubscribe').and.callThrough();

    component.ngOnInit();
    component.ngOnDestroy();
    expect(subscriptions.unsubscribe).toHaveBeenCalled();
  });
});
