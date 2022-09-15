import { HttpClient } from '@angular/common/http';
import { OccEndpointsService } from '@spartacus/core';
import { of } from 'rxjs';
import { OccAppointmentSchedulingAdapter } from './occ-appointment-scheduling.adapter';

const agentId = 'agentId';
const userId = 'userId';
const formData = 'formData';

describe('OccAppointmentSchedulingAdapter', () => {
  let adapter: OccAppointmentSchedulingAdapter;
  let occEndpointServiceSpy: jasmine.SpyObj<OccEndpointsService>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    occEndpointServiceSpy = jasmine.createSpyObj('OccEndpointsService', [
      'buildUrl',
    ]);

    adapter = new OccAppointmentSchedulingAdapter(
      httpClientSpy,
      occEndpointServiceSpy
    );
  });

  it('should check if all services are injected', () => {
    expect(adapter).toBeTruthy();
    expect(occEndpointServiceSpy).toBeTruthy();
    expect(httpClientSpy).toBeTruthy();
  });

  it('should return expected createAppointmentForAgent (HttpClient called once)', (done: DoneFn) => {
    const mockedResponse = [
      { id: 1, name: 'A' },
      { id: 2, name: 'B' },
    ];

    httpClientSpy.post.and.returnValue(of(mockedResponse));

    adapter.createAppointmentForAgent(agentId, userId, formData).subscribe({
      next: res => {
        expect(res).toEqual(mockedResponse);
        done();
      },
      error: done.fail,
    });

    expect(httpClientSpy.post.calls.count()).toBe(1);
  });
});
