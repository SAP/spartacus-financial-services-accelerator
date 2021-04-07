import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { I18nTestingModule } from '@spartacus/core';
import { ClaimService } from 'projects/fsastorefrontlib/src/core';
import { of } from 'rxjs';
import { ClaimPrefillResolver } from './claim-prefill-resolver';

const claimNumber = 'mockClaim';

const mockClaim = {
  claimNumber: claimNumber,
  claimStatus: 'OPEN',
  incidentType: {
    icon: {
      url: 'testURL',
      alt: 'testALT',
    },
    incidentName: 'Mock Incident Name',
    incidentCode: 'mockIncidentCode',
  },
};

class MockClaimService {
  getCurrentClaim(): any {
    return of(mockClaim);
  }
  getLoaded() {
    return of(true);
  }
}

describe('ClaimPrefillResolver', () => {
  let claimPrefillResolver: ClaimPrefillResolver;
  let claimService: ClaimService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, StoreModule.forRoot({})],
      providers: [{ provide: ClaimService, useClass: MockClaimService }],
    });

    claimPrefillResolver = TestBed.inject(ClaimPrefillResolver);
    claimService = TestBed.inject(ClaimService);
  });

  it('should inject cart resolver', () => {
    expect(claimPrefillResolver).toBeTruthy();
  });

  it('should resolve claim attribute by path', () => {
    const claimAttributePath = 'incidentType.incidentCode';
    let result;
    claimPrefillResolver
      .getPrefillValue(claimAttributePath)
      .subscribe(value => {
        result = value;
      })
      .unsubscribe();
    expect(result).toEqual(mockClaim.incidentType.incidentCode);
  });
});
