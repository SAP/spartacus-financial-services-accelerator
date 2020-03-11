import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { of } from 'rxjs';
import { ChangeRequestService } from './../../../core/change-request/facade/change-request.service';
import { ChangeProcessNavigationComponent } from './change-process-navigation.component';

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

describe('ChangeProcessNavigationComponent', () => {
  let component: ChangeProcessNavigationComponent;
  let fixture: ComponentFixture<ChangeProcessNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      providers: [
        { provide: ChangeRequestService, useClass: MockChangeRequestService },
      ],
      declarations: [ChangeProcessNavigationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeProcessNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
