import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { ClaimStatus } from './../../../occ/occ-models/occ.models';
import { ClaimDataService } from './../../../core/my-account/services/claim-data.service';
import { UserRequestConfirmationComponent } from './user-request-confirmation.component';
import { Claim } from '../../../occ/occ-models';

const TEST_CLAIM_NUMBER = 'testClaimNumber';

class MockClaimDataService {
  claimData: Claim = {
    claimNumber: TEST_CLAIM_NUMBER,
    claimStatus: ClaimStatus.PROCESSING,
  };
}

describe('UserRequestConfirmationComponent', () => {
  let component: UserRequestConfirmationComponent;
  let fixture: ComponentFixture<UserRequestConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [UserRequestConfirmationComponent],
      providers: [
        {
          provide: ClaimDataService,
          useClass: MockClaimDataService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRequestConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should check claim number', () => {
    expect(component.claimNumber).toEqual(TEST_CLAIM_NUMBER);
  });
});
