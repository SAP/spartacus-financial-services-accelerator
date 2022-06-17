import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
  GlobalMessageService,
  I18nTestingModule,
  RoutingService,
} from '@spartacus/core';
import { AppointmentSchedulingService } from '../../../core/appointment-scheduling/facade/appointment-scheduling.service';
import { AgentSearchService } from '../../../core/agent/facade/agent-search.service';
import { AppointmentSchedulingFormComponent } from './appointment-scheduling-form.component';
import { of } from 'rxjs';

describe('AppointmentSchedulingFormComponent', () => {
  let component: AppointmentSchedulingFormComponent;
  let fixture: ComponentFixture<AppointmentSchedulingFormComponent>;

  let agentSearchServiceSpy: jasmine.SpyObj<AgentSearchService>;
  let globalMessageServiceSpy: jasmine.SpyObj<GlobalMessageService>;
  let routingServiceSpy: jasmine.SpyObj<RoutingService>;
  let appointmentSchedulingServiceSpy: jasmine.SpyObj<AppointmentSchedulingService>;

  beforeEach(
    waitForAsync(() => {
      agentSearchServiceSpy = jasmine.createSpyObj('AgentSearchService', [
        'getAgentByID',
      ]);
      globalMessageServiceSpy = jasmine.createSpyObj('GlobalMessageService', [
        'add',
      ]);
      routingServiceSpy = jasmine.createSpyObj('RoutingService', [
        'go',
        'back',
      ]);
      appointmentSchedulingServiceSpy = jasmine.createSpyObj(
        'AppointmentSchedulingService',
        ['createAppointment']
      );

      TestBed.configureTestingModule({
        imports: [RouterTestingModule, ReactiveFormsModule, I18nTestingModule],
        declarations: [AppointmentSchedulingFormComponent],
        providers: [
          { provide: AgentSearchService, useValue: agentSearchServiceSpy },
          { provide: GlobalMessageService, useValue: globalMessageServiceSpy },
          { provide: RoutingService, useValue: routingServiceSpy },
          {
            provide: AppointmentSchedulingService,
            useValue: appointmentSchedulingServiceSpy,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentSchedulingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should go back', () => {
    component.goBack();
    expect(routingServiceSpy.back).toHaveBeenCalled();
  });

  it('should call submit with invalid form', () => {
    spyOn(component, 'submit').and.callThrough();
    component.submit();
    expect(component.submit).toHaveBeenCalled();
    expect(component.form.valid).toBeFalse();
  });

  it('should call submit with valid form', () => {
    spyOn(component, 'submit').and.callThrough();
    appointmentSchedulingServiceSpy.createAppointment.and.returnValue(
      of('Test')
    );

    component.form.setValue({
      subject: 'test',
      appointmentDate: 'test',
      appointmentTime: 'test',
      description: 'test',
      consentGiven: true,
    });

    component.submit();
    expect(component.submit).toHaveBeenCalled();
    expect(component.form.valid).toBeTrue();
  });
});
