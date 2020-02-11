import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { I18nTestingModule } from '@spartacus/core';
import { ClaimStatus } from './../../../occ/occ-models/occ.models';
import { ClaimDataService } from '../../../core/my-account/services/claim/claim-data.service';
import { UserRequestConfirmationComponent } from './user-request-confirmation.component';
import { Claim } from '../../../occ/occ-models';

const TEST_CLAIM_NUMBER = 'testClaimNumber';

class MockClaimDataService {
  claimData: Claim = {
    claimNumber: TEST_CLAIM_NUMBER,
    claimStatus: ClaimStatus.PROCESSING,
  };
}

const mockImageSrc =
  'data:image/svg+xml;base64, PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAxMTUgMTE1IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxMTUgMTE1IiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOnVybCgjYSk7fQoJLnN0MXtmaWxsOiNGRkZGRkY7fQoJLnN0MntmaWxsOiNFRUVFRUU7fQoJLnN0M3tmaWxsOiMwMDAwMzM7fQoJLnN0NHtmaWxsOiMwMDY2Q0M7fQo8L3N0eWxlPgoKCQoJCTxsaW5lYXJHcmFkaWVudCBpZD0iYSIgeDE9IjI2OC41IiB4Mj0iMjY4LjUiIHkxPSIxMDEuNSIgeTI9Ii04LjUiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoLTEgMCAwIC0xIDMyNiAxMDQpIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CgkJPHN0b3Agc3RvcC1jb2xvcj0iI2ZmZiIgb2Zmc2V0PSIwIi8+CgkJPHN0b3Agc3RvcC1jb2xvcj0iIzAwQjlGMiIgb2Zmc2V0PSIwIi8+CgkJPHN0b3Agc3RvcC1jb2xvcj0iIzAxOUNFMCIgb2Zmc2V0PSIuNTQ5Ii8+CgkJPHN0b3Agc3RvcC1jb2xvcj0iIzBDN0VDRiIgb2Zmc2V0PSIuNzczIi8+CgkJPHN0b3Agc3RvcC1jb2xvcj0iIzE2NjFCRSIgb2Zmc2V0PSIxIi8+Cgk8L2xpbmVhckdyYWRpZW50PgoJPGNpcmNsZSBjbGFzcz0ic3QwIiBjeD0iNTcuNSIgY3k9IjU3LjUiIHI9IjU1Ii8+CgkKCQkKCQkJPHBhdGggY2xhc3M9InN0MSIgZD0ibTM4LjkgMjkuMmgyNS42bDEzLjUgMTMuM3Y0MS43YzAgMS4xLTAuOSAxLjktMS45IDEuOWgtMzcuMmMtMS4xIDAtMS45LTAuOS0xLjktMS45di01My4xYzAtMS4xIDAuOS0xLjkgMS45LTEuOXoiLz4KCQkJPHBhdGggY2xhc3M9InN0MiIgZD0ibTY0IDQwLjN2LTExLjVsMTMuNCAxMy40aC0xMS40Yy0xLjEgMC0yLTAuOS0yLTEuOXoiLz4KCQkKCQk8cmVjdCBjbGFzcz0ic3QzIiB4PSI0MSIgeT0iNDcuMiIgd2lkdGg9IjMzIiBoZWlnaHQ9IjEiLz4KCQk8cmVjdCBjbGFzcz0ic3QzIiB4PSI0MSIgeT0iNTMuMiIgd2lkdGg9IjMzIiBoZWlnaHQ9IjEiLz4KCQk8cmVjdCBjbGFzcz0ic3QzIiB4PSI0MSIgeT0iNTguMiIgd2lkdGg9IjMzIiBoZWlnaHQ9IjEiLz4KCQk8cmVjdCBjbGFzcz0ic3QzIiB4PSI0MSIgeT0iNjQuMiIgd2lkdGg9IjMzIiBoZWlnaHQ9IjEiLz4KCQk8cmVjdCBjbGFzcz0ic3QzIiB4PSI0MSIgeT0iNjkuMiIgd2lkdGg9IjMzIiBoZWlnaHQ9IjEiLz4KCQk8cmVjdCBjbGFzcz0ic3QzIiB4PSI0MSIgeT0iNzUuMiIgd2lkdGg9IjMzIiBoZWlnaHQ9IjEiLz4KCQk8cmVjdCBjbGFzcz0ic3QzIiB4PSI0MSIgeT0iODAuMiIgd2lkdGg9IjMzIiBoZWlnaHQ9IjEiLz4KCQk8cmVjdCBjbGFzcz0ic3Q0IiB4PSI0MS41I';

class MockDomSanitizer {
  bypassSecurityTrustUrl() {
    return mockImageSrc;
  }
  sanitize() {}
}

describe('UserRequestConfirmationComponent', () => {
  let component: UserRequestConfirmationComponent;
  let fixture: ComponentFixture<UserRequestConfirmationComponent>;
  let mockSanitizer: MockDomSanitizer;

  beforeEach(async(() => {
    mockSanitizer = new MockDomSanitizer();
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [UserRequestConfirmationComponent],
      providers: [
        {
          provide: ClaimDataService,
          useClass: MockClaimDataService,
        },
        {
          provide: DomSanitizer,
          useValue: mockSanitizer,
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

  it('should check image src', () => {
    expect(component.getImagelink()).toEqual(mockImageSrc);
  });
});
