import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
  GlobalMessageService,
  I18nTestingModule,
  OCC_USER_ID_CURRENT,
  RoutingService,
  UserIdService,
} from '@spartacus/core';
import { AppointmentSchedulingService } from '../../../core/appointment-scheduling/facade/appointment-scheduling.service';
import { AppointmentSchedulingFormComponent } from './appointment-scheduling-form.component';
import { Observable, of } from 'rxjs';
import createSpy = jasmine.createSpy;
import { DateConfig } from './../../../core/date-config/date-config';
import { ActivatedRoute } from '@angular/router';

const agentParams = 'agent@test.com';
const createdAppointment = {
  code: 'testCode',
  consentGiven: true,
  date: '2023-09-15 13:00',
  subject: 'Test Subject',
  description: 'Test Description',
  assignedAgent: {
    email: 'testagent@sapfsa.com',
    displayName: 'Test Agent',
  },
};
let mockParams = {
  agentParams: agentParams,
};

class ActivatedRouteMock {
  params = of(mockParams);
}
class MockGlobalMessageService {
  add(): void {}
}
class MockRoutingService {
  go = createSpy();
  back = createSpy();
}
const MockDateConfig: DateConfig = {
  date: {
    format: 'yyyy-mm-dd',
  },
};
class MockAppointmentSchedulingService {
  createAppointment() {
    return of(createdAppointment);
  }
}

class MockUserIdService {
  getUserId(): Observable<string> {
    return of(OCC_USER_ID_CURRENT);
  }
}

describe('AppointmentSchedulingFormComponent', () => {
  let component: AppointmentSchedulingFormComponent;
  let fixture: ComponentFixture<AppointmentSchedulingFormComponent>;

  let globalMessageService: GlobalMessageService;
  let mockRoutingService: RoutingService;
  let mockAppointmentSchedulingService: AppointmentSchedulingService;
  let mockUserIdService: UserIdService;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AppointmentSchedulingFormComponent],
        imports: [RouterTestingModule, ReactiveFormsModule, I18nTestingModule],
        providers: [
          {
            provide: AppointmentSchedulingService,
            useClass: MockAppointmentSchedulingService,
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
            provide: DateConfig,
            useValue: MockDateConfig,
          },
          {
            provide: UserIdService,
            useClass: MockUserIdService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentSchedulingFormComponent);
    component = fixture.componentInstance;
    globalMessageService = TestBed.inject(GlobalMessageService);
    mockAppointmentSchedulingService = TestBed.inject(
      AppointmentSchedulingService
    );
    mockRoutingService = TestBed.inject(RoutingService);
    mockUserIdService = TestBed.inject(UserIdService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentSchedulingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should call submit with invalid form', () => {
    spyOn(component, 'submit').and.callThrough();
    component.submit();
    expect(component.submit).toHaveBeenCalled();
    expect(component.form.valid).toBeFalse();
  });

  it('should fail to create appointment when agent is not specified', () => {
    spyOn(component, 'submit').and.callThrough();
    mockParams = null;
    component.submit();
    expect(component.submit).toHaveBeenCalled();
    expect(component.form.valid).toBeFalse();
  });

  it('should call submit with valid form', () => {
    spyOn(component, 'submit').and.callThrough();

    component.form.setValue({
      subject: 'Subject',
      appointmentDate: new Date('2030-02-11T13:02:58+0000'),
      appointmentTime: '10:00 (1h)',
      description: 'Description',
      consentGiven: true,
    });

    component.submit();
    expect(component.submit).toHaveBeenCalled();
    expect(component.form.valid).toBeTrue();
  });

  it('should go back', () => {
    component.goBack();
    expect(mockRoutingService.back).toHaveBeenCalled();
  });

  it('should unsubscribe from any subscriptions when destroyed', () => {
    const subscriptions = component['subscription'];
    spyOn(subscriptions, 'unsubscribe').and.callThrough();
    component.ngOnDestroy();
    expect(subscriptions.unsubscribe).toHaveBeenCalled();
  });
});
