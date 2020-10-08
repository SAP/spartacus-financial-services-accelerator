import { inject, TestBed } from '@angular/core/testing';
import { AuthService, OCC_USER_ID_CURRENT } from '@spartacus/core';
import { FileUploadService } from './file-upload.service';
import { Observable, of } from 'rxjs';
import { UploadConnector } from '../../connectors/upload.connector';

class MockUploadConnector {
  uploadFile(userId, file) {
    return of();
  }
}

class MockAuthService {
  getOccUserId(): Observable<string> {
    return of(OCC_USER_ID_CURRENT);
  }
}

describe('FileUploadService', () => {
  let service: FileUploadService;
  let mockOccFileUploadConnector: MockUploadConnector;
  beforeEach(() => {
    mockOccFileUploadConnector = new MockUploadConnector();
    TestBed.configureTestingModule({
      providers: [
        FileUploadService,
        {
          provide: UploadConnector,
          useValue: mockOccFileUploadConnector,
        },
        {
          provide: AuthService,
          useClass: MockAuthService,
        },
      ],
    });

    service = TestBed.inject(FileUploadService);
  });

  it('should check if FileUploadService is injected', inject(
    [FileUploadService],
    (fileUploadService: FileUploadService) => {
      expect(fileUploadService).toBeTruthy();
    }
  ));
});
