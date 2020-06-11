import { Pipe, PipeTransform, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  GlobalMessageService,
  I18nTestingModule,
  RoutingService,
  UserService,
} from '@spartacus/core';
import { of } from 'rxjs';
import { AgentSearchService } from '../../../core/agent/facade/agent-search.service';
import { CsTicketService } from './../../../core/cs-ticket/facade/cs-ticket.service';
import { ContactAgentFormComponent } from './contact-agent-form.component';

import createSpy = jasmine.createSpy;

const mockedUserDetails = {
  firstName: 'Test',
  lastName: 'Testera',
  uid: 'test@testera.com',
};
const agentParams = 'agent@test.com';
const ticketData = {
  interest: 'INCIDENT',
  contactType: 'EMAIL',
  subject: 'Ticket subject',
};
const mockAgentSearchService = {
  getAgentByID: jasmine.createSpy().and.returnValue(of({})),
};
const mockContactAgentForm: any = {
  email: 'test@email.com',
  interest: 'PROBLEM',
  contactType: 'CALL',
  subject: 'The Subject',
  message: 'Test message',
};

let mockParams = {
  agentParams: agentParams,
};

class ActivatedRouteMock {
  params = of(mockParams);
}
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

class MockCsTicketService {
  createCsTicketForAgent() {
    return of(ticketData);
  }
}
class MockRoutingService {
  go = createSpy();
}

class MockGlobalMessageService {
  add(): void {}
}

describe('ContactAgentFormComponent', () => {
  let component: ContactAgentFormComponent;
  let fixture: ComponentFixture<ContactAgentFormComponent>;
  let mockedUserService: MockedUserService;
  let mockedCsTicketService: MockCsTicketService;
  let mockSearchService: AgentSearchService;
  let globalMessageService: GlobalMessageService;
  let mockRoutingService: MockRoutingService;

  beforeEach(async(() => {
    mockedUserService = new MockedUserService();
    mockedCsTicketService = new MockCsTicketService();
    mockRoutingService = new MockRoutingService();
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
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
        {
          provide: CsTicketService,
          useValue: mockedCsTicketService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactAgentFormComponent);
    component = fixture.componentInstance;
    globalMessageService = TestBed.get(GlobalMessageService);
    mockedUserService = TestBed.get(UserService as Type<UserService>);
    mockSearchService = TestBed.get(
      AgentSearchService as Type<AgentSearchService>
    );
    mockedCsTicketService = TestBed.get(
      CsTicketService as Type<CsTicketService>
    );
    mockRoutingService = TestBed.get(RoutingService as Type<RoutingService>);
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
    fixture.detectChanges();
    expect(mockSearchService.getAgentByID).toHaveBeenCalled();
  });

  it('should unsubscribe from any subscriptions when destroyed', () => {
    const subscriptions = component['subscription'];
    spyOn(subscriptions, 'unsubscribe').and.callThrough();

    component.ngOnInit();
    component.ngOnDestroy();
    expect(subscriptions.unsubscribe).toHaveBeenCalled();
  });

  describe('collectDataFromContactAgentForm()', () => {
    it('should return contact agent data', () => {
      const form = mockContactAgentForm;

      expect(
        component.collectDataFromContactAgentForm(mockContactAgentForm)
      ).toEqual({
        email: form.email,
        interest: form.interest,
        contactType: form.contactType,
        subject: form.subject,
        message: form.message,
      });
    });
  });

  it('should submit form', () => {
    spyOn(mockedCsTicketService, 'createCsTicketForAgent').and.returnValue(
      of(ticketData)
    );
    component.ngOnInit();
    component.submit();
    expect(mockRoutingService.go).toHaveBeenCalled();
  });
});
