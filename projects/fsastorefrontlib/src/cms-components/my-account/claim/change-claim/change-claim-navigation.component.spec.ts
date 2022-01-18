import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  FileService,
  FormDataService,
  YFormData,
} from '@spartacus/dynamicforms';
import {
  I18nTestingModule,
  OCC_USER_ID_CURRENT,
  RoutingService,
  UserIdService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { ClaimService } from './../../../../core/my-account/facade/claim.service';
import { ChangeClaimNavigationComponent } from './change-claim-navigation.component';
import createSpy = jasmine.createSpy;

const mockedClaim = {
  claimNumber: '000001',
  claimStatus: 'OPEN',
  incidentType: {
    icon: {
      url: 'testURL',
      alt: 'testALT',
    },
    incidentName: 'Theft',
  },
};

const formData: YFormData = {
  id: 'test-formData',
  type: 'DATA',
  content:
    '{"testContent":{"tripDestination":"Europe","tripStartDate":"2022-02-02"}}',
};

const blob1 = new Blob([''], { type: 'application/pdf' });
blob1['lastModifiedDate'] = '';
blob1['name'] = 'testFile1';
blob1['code'] = 'DOC00002012';
const mockFile = <File>blob1;
const uploadedContent = {
  content: {
    files: [mockFile],
  },
};

const claimId = 'CL00001';
const claimMock = {
  claimNumber: claimId,
};

export class MockClaimService {
  loadClaimById(_claimId) {}
  getCurrentClaim() {}
  changeClaim(_claimMock, _claimId) {}
}

export class MockFileService {
  getUploadedDocuments() {
    return of(uploadedContent);
  }
  resetFiles() {}
}

export class MockFormDataService {
  getSubmittedForm() {
    return of(formData);
  }
  submit() {}
}

class MockUserIdService {
  getUserId(): Observable<string> {
    return of(OCC_USER_ID_CURRENT);
  }
}

class MockRoutingService {
  go = createSpy();
  getRouterState(): Observable<any> {
    return of({
      state: {
        params: {
          claimId: '0000002',
        },
      },
    });
  }
}

describe('ChangeClaimNavigationComponent', () => {
  let component: ChangeClaimNavigationComponent;
  let fixture: ComponentFixture<ChangeClaimNavigationComponent>;
  let mockClaimService: ClaimService;
  let mockFileService: MockFileService;
  let mockFormDataService: FormDataService;
  let mockRoutingService: RoutingService;
  let mockUserIdService: UserIdService;

  beforeEach(async () => {
    mockFileService = new MockFileService();
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule, RouterTestingModule],
      declarations: [ChangeClaimNavigationComponent],
      providers: [
        { provide: ClaimService, useClass: MockClaimService },
        {
          provide: FormDataService,
          useClass: MockFormDataService,
        },
        {
          provide: FileService,
          useValue: mockFileService,
        },
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
        { provide: UserIdService, useClass: MockUserIdService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeClaimNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockFormDataService = TestBed.inject(FormDataService);
    mockClaimService = TestBed.inject(ClaimService);
    mockFileService = TestBed.inject(FileService);
    mockUserIdService = TestBed.inject(UserIdService);
    mockRoutingService = TestBed.inject(RoutingService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate back to Claims page', () => {
    component.back();
    expect(mockRoutingService.go).toHaveBeenCalled();
  });

  it('should submit the Claim change', () => {
    spyOn(mockFormDataService, 'submit').and.callThrough();
    spyOn(mockFileService, 'getUploadedDocuments').and.callThrough();
    spyOn(mockFileService, 'resetFiles').and.callThrough();
    spyOn(mockUserIdService, 'getUserId').and.callThrough();
    spyOn(mockClaimService, 'changeClaim').and.callThrough();
    component.submit(claimMock);
    expect(mockFileService.resetFiles).toHaveBeenCalled();
  });
});
