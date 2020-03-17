import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeSimulationComponent } from './change-simulation.component';
import { I18nTestingModule } from '@spartacus/core';
import { of } from 'rxjs';
import { ChangeRequestService } from './../../../core/change-request/facade/change-request.service';
import { PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

const mockChangeRequest = {
  requestId: 'testRequestId',
  insurancePolicy: {
    policyNumber: 'testPolicy',
    categoryCode: {
      code: 'testCategory',
    },
  },
};
class MockChangeRequestService {
  getChangeRequest() {
    return of(mockChangeRequest);
  }
}
class MockParseDatePipe implements PipeTransform {
  transform() {}
}

describe('ChangeSimulationComponent', () => {
  let component: ChangeSimulationComponent;
  let fixture: ComponentFixture<ChangeSimulationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      providers: [
        { provide: ChangeRequestService, useClass: MockChangeRequestService },
        { provide: DatePipe, useClass: MockParseDatePipe },
      ],
      declarations: [ChangeSimulationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeSimulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
