import { TestBed } from '@angular/core/testing';
import { AppointmentData } from '../../../occ/occ-models/occ.models';
import { of } from 'rxjs';
import { AppointmentSchedulingAdapter } from './appointment-scheduling.adapter';
import { AppointmentSchedulingConnector } from './appointment-scheduling.connector';
import createSpy = jasmine.createSpy;

class MockAppointmentSchedulingAdapter implements AppointmentSchedulingAdapter {
  createAppointmentForAgent = createSpy(
    'AppointmentSchedulingAdapter.createAppointmentForAgent'
  ).and.callFake((agentCode, userCode, appointmentDataObject) =>
    of('createAppointmentForAgent' + agentCode + userCode + appointmentDataObject)
  );
}

const agentId = 'agentId';
const userId = 'userId';
const appointmentData: AppointmentData = {
  subject: 'test',
  appointmentDate: 'test',
  appointmentTime: 'test',
  description: 'test',
  consentGiven: true,
};

describe('AppointmentSchedulingConnector', () => {
  let appointmentSchedulingConnector: AppointmentSchedulingConnector;
  let appointmentSchedulingAdapter: AppointmentSchedulingAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AppointmentSchedulingAdapter,
          useClass: MockAppointmentSchedulingAdapter,
        },
      ],
    });

    appointmentSchedulingConnector = TestBed.inject(
      AppointmentSchedulingConnector
    );
    appointmentSchedulingAdapter = TestBed.inject(AppointmentSchedulingAdapter);
  });

  it('should be created', () => {
    expect(appointmentSchedulingConnector).toBeTruthy();
  });

  it('should call adapter for createAppointmentForAgent', () => {
    appointmentSchedulingConnector.createAppointmentForAgent(
      agentId,
      userId,
      appointmentData
    );
    expect(
      appointmentSchedulingAdapter.createAppointmentForAgent
    ).toHaveBeenCalledWith(agentId, userId, appointmentData);
  });
});
