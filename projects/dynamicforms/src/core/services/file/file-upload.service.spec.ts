import { inject, TestBed } from '@angular/core/testing';
import { AuthService, OCC_USER_ID_CURRENT } from '@spartacus/core';
import { FileUploadService } from './file-upload.service';
import { Observable, of } from 'rxjs';
import { UploadConnector } from '../../connectors/upload.connector';
import { StateWithForm } from './../../store/state';
import { Store, StoreModule } from '@ngrx/store';
import { reducerProvider, reducerToken } from '../../store/reducers';
import * as fromAction from '../../store/actions';

class MockUploadConnector {
  uploadFile(userId, file) {
    return of();
  }
}

const blob1 = new Blob([''], { type: 'application/pdf' });
blob1['lastModifiedDate'] = '';
blob1['name'] = 'testFile1';
const mockFile = <File>blob1;

const mockBody = {
  code: '00007011',
  downloadUrl: '/medias/testFile1.pdf',
};
const mockHttpResponse = {
  body: {
    code: '00007012',
    downloadUrl: '/medias/testFile1.pdf',
  },
};

class MockAuthService {
  getOccUserId(): Observable<string> {
    return of(OCC_USER_ID_CURRENT);
  }
}

describe('FileUploadService', () => {
  let service: FileUploadService;
  let mockOccFileUploadConnector: MockUploadConnector;
  let store: Store<StateWithForm>;

  beforeEach(() => {
    mockOccFileUploadConnector = new MockUploadConnector();
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('form', reducerToken),
      ],
      providers: [
        FileUploadService,
        reducerProvider,
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
    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should check if FileUploadService is injected', inject(
    [FileUploadService],
    (fileUploadService: FileUploadService) => {
      expect(fileUploadService).toBeTruthy();
    }
  ));

  it('should start file upload', () => {
    let response;
    service
      .uploadFile(mockFile)
      .subscribe(event => {
        if (event) {
          response = event;
          expect(response).toEqual(mockHttpResponse);
        }
      })
      .unsubscribe();
  });

  it('should get status of file being uploaded', () => {
    service.setFileInStore(mockBody);
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.UploadFileSuccess({
        body: mockBody,
      })
    );
  });

  it('should remove file by code', () => {
    service.removeFileForCode(OCC_USER_ID_CURRENT, mockBody.code);
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.RemoveFile({
        user: OCC_USER_ID_CURRENT,
        fileCode: mockBody.code,
      })
    );
  });

  it('should remove all files', () => {
    const fileList = [{ code: 'fileCode1' }, { code: 'fileCode2' }];
    service.removeAllFiles(OCC_USER_ID_CURRENT, fileList);
    expect(store.dispatch).toHaveBeenCalledTimes(2);
  });
});
