import { PipeTransform, Pipe, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule, UserService } from '@spartacus/core';
import { of } from 'rxjs';

import { ContactAgentFormComponent } from './contact-agent-form.component';
import { AgentSearchService } from '../../../core/agent/services/agent-search.service';

const mockedUserDetails = {
  firstName: 'Test',
  lastName: 'Testera',
  uid: 'test@testera.com',
};

const agentParams = 'agent@test.com';

let mockParams = {
  agentParams: agentParams,
};

class ActivatedRouteMock {
  params = of(mockParams);
}

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

describe('ContactAgentFormComponent', () => {
  let component: ContactAgentFormComponent;
  let fixture: ComponentFixture<ContactAgentFormComponent>;
  let mockedUserService: MockedUserService;
  let mockSearchService: AgentSearchService;

  beforeEach(async(() => {
    mockedUserService = new MockedUserService();
    TestBed.configureTestingModule({
      declarations: [ContactAgentFormComponent, MockUrlPipe],
      imports: [I18nTestingModule, RouterTestingModule, ReactiveFormsModule],
      providers: [
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
    mockedUserService = TestBed.get(UserService as Type<UserService>);
    mockSearchService = TestBed.get(AgentSearchService as Type<
      AgentSearchService
    >);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the user details', () => {
    spyOn(mockedUserService, 'get').and.returnValue(of(mockedUserDetails));
    fixture.detectChanges();
    expect(mockedUserService.get).toHaveBeenCalled();
  });

  it('should NOT get the user details', () => {
    spyOn(mockedUserService, 'get').and.returnValue(of(undefined));
    fixture.detectChanges();
    expect(mockedUserService.get).toHaveBeenCalled();
  });

  it('should NOT find agent', () => {
    mockParams = null;
    expect(mockSearchService.getAgentByID).toHaveBeenCalled();
  });

  it('should unsubscribe from any subscriptions when destroyed', () => {
    const subscriptions = component['subscription'];
    spyOn(subscriptions, 'unsubscribe').and.callThrough();

    component.ngOnInit();
    component.ngOnDestroy();
    expect(subscriptions.unsubscribe).toHaveBeenCalled();
  });
});
