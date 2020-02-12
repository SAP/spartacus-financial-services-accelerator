import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule, RoutingService } from '@spartacus/core';
import { CreateClaimComponent } from './create-claim.component';
import { ClaimService } from '../../../../core/my-account/services/claim/claim.service';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { SelectedPolicy } from '../../../../core/my-account/services';
import createSpy = jasmine.createSpy;

class MockRoutingService {
  go = createSpy();
}

const selectedPolicy: BehaviorSubject<SelectedPolicy> = new BehaviorSubject(
  null
);

class MockClaimService {
  createClaim = createSpy();

  getSelectedPolicy() {
    return selectedPolicy.asObservable();
  }
}

const mockSelectedPolicy: SelectedPolicy = {
  userId: 'testUser',
  policyId: 'testPolicy',
  contractId: 'testContract',
};

describe('CreateClaimComponent', () => {
  let component: CreateClaimComponent;
  let fixture: ComponentFixture<CreateClaimComponent>;
  let mockClaimService: MockClaimService;
  let mockRoutingService: MockRoutingService;

  beforeEach(async(() => {
    mockClaimService = new MockClaimService();
    mockRoutingService = new MockRoutingService();
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, FormsModule, StoreModule.forRoot({})],
      providers: [
        { provide: ClaimService, useValue: mockClaimService },
        { provide: RoutingService, useValue: mockRoutingService },
      ],
      declarations: [CreateClaimComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should prevent start claim', () => {
    selectedPolicy.next(null);
    fixture.detectChanges();
    expect(component.startClaim()).toEqual(undefined);
  });

  it('should start claim', () => {
    selectedPolicy.next(mockSelectedPolicy);
    fixture.detectChanges();
    component.startClaim();

    expect(mockClaimService.createClaim).toHaveBeenCalledWith(
      mockSelectedPolicy.policyId,
      mockSelectedPolicy.contractId
    );

    expect(mockRoutingService.go).toHaveBeenCalledWith({
      cxRoute: 'fnolIncidentPage',
    });
  });
});
