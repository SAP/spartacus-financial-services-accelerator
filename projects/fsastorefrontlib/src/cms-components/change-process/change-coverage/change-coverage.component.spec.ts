import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { of } from 'rxjs';
import { ChangeRequestService } from './../../../core/change-request/facade/change-request.service';
import { ChangeCoverageComponent } from './change-coverage.component';

const mockChangeRequest = {
  requestId: 'testRequestId',
  insurancePolicy: {
    policyNumber: 'testPolicy',
    categoryCode: {
      code: 'testCategory',
    },
    optionalProducts: [
      {
        coverageProduct: {
          cartDisplayName: 'product_one',
        },
      },
      {
        coverageProduct: {
          cartDisplayName: 'product_two',
        },
      },
    ],
  },
};
class MockChangeRequestService {
  getChangeRequest() {
    return of(mockChangeRequest);
  }
}
describe('ChangeCoverageComponent', () => {
  let component: ChangeCoverageComponent;
  let fixture: ComponentFixture<ChangeCoverageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      providers: [
        { provide: ChangeRequestService, useClass: MockChangeRequestService },
      ],
      declarations: [ChangeCoverageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeCoverageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
