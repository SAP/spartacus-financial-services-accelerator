import { TestBed } from '@angular/core/testing';
import { AppointmentData } from '../../../occ/occ-models/occ.models';
import { of } from 'rxjs';
import { AppointmentSchedulingConnector } from '../connectors';
import { AppointmentSchedulingService } from './appointment-scheduling.service';

const agentId = 'agentId';
const userId = 'userId';
const appointmentData: AppointmentData = {
  subject: 'test',
  appointmentDate: 'test',
  appointmentTime: 'test',
  description: 'test',
  consentGiven: true,
};

describe('AppointmentSchedulingServiceTest', () => {
  let appointmentSchedulingService: AppointmentSchedulingService;
  let appointmentSchedulingConnectorSpy: jasmine.SpyObj<AppointmentSchedulingConnector>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('AppointmentSchedulingConnector', [
      'createAppointmentForAgent',
    ]);

    TestBed.configureTestingModule({
      providers: [
        AppointmentSchedulingService,
        { provide: AppointmentSchedulingConnector, useValue: spy },
      ],
    });

    appointmentSchedulingService = TestBed.inject(AppointmentSchedulingService);
    appointmentSchedulingConnectorSpy = TestBed.inject(
      AppointmentSchedulingConnector
    ) as jasmine.SpyObj<AppointmentSchedulingConnector>;
  });

  it('should check if all services are injected', () => {
    expect(appointmentSchedulingService).toBeTruthy();
    expect(appointmentSchedulingConnectorSpy).toBeTruthy();
  });

  it('should check if createAppointment is called', () => {
    const stubValue = of('test');
    appointmentSchedulingConnectorSpy.createAppointmentForAgent.and.returnValue(
      stubValue
    );

    expect(
      appointmentSchedulingService.createAppointment(
        agentId,
        userId,
        appointmentData
      )
    ).toBe(stubValue);

    expect(
      appointmentSchedulingConnectorSpy.createAppointmentForAgent.calls.count()
    ).toBe(1);

    expect(
      appointmentSchedulingConnectorSpy.createAppointmentForAgent.calls.mostRecent()
        .returnValue
    ).toBe(stubValue);
  });
});
