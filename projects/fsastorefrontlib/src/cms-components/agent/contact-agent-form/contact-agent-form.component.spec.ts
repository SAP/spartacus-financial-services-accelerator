import { Pipe, PipeTransform } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  GlobalMessageService,
  I18nTestingModule,
  RoutingService,
} from '@spartacus/core';
import { of } from 'rxjs';
import { AgentSearchService } from '../../../core/agent/facade/agent-search.service';
import { CsTicketService } from './../../../core/cs-ticket/facade/cs-ticket.service';
import { ContactAgentFormComponent } from './contact-agent-form.component';

import createSpy = jasmine.createSpy;
import { UserAccountFacade } from '@spartacus/user/account/root';

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
class MockedUserAccountFacade {
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
  let mockedUserAccountFacade: UserAccountFacade;
  let mockedCsTicketService: CsTicketService;
  let mockSearchService: AgentSearchService;
  let globalMessageService: GlobalMessageService;
  let mockRoutingService: RoutingService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ContactAgentFormComponent, MockUrlPipe],
        imports: [I18nTestingModule, RouterTestingModule, ReactiveFormsModule],
        providers: [
          {
            provide: UserAccountFacade,
            useClass: MockedUserAccountFacade,
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
            useClass: MockCsTicketService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactAgentFormComponent);
    component = fixture.componentInstance;
    globalMessageService = TestBed.inject(GlobalMessageService);
    mockedUserAccountFacade = TestBed.inject(UserAccountFacade);
    mockSearchService = TestBed.inject(AgentSearchService);
    mockedCsTicketService = TestBed.inject(CsTicketService);
    mockRoutingService = TestBed.inject(RoutingService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the user details', () => {
    spyOn(mockedUserAccountFacade, 'get').and.returnValue(
      of(mockedUserDetails)
    );
    fixture.detectChanges();
    expect(mockedUserAccountFacade.get).toHaveBeenCalled();
  });

  it('should NOT get the user details', () => {
    spyOn(mockedUserAccountFacade, 'get').and.returnValue(of(undefined));
    fixture.detectChanges();
    expect(mockedUserAccountFacade.get).toHaveBeenCalled();
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
