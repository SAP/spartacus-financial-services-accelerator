import { inject, TestBed } from '@angular/core/testing';
import { AuthService, OCC_USER_ID_CURRENT } from '@spartacus/core';
import { FileService } from './file.service';
import { Observable, of } from 'rxjs';
import { FileConnector } from '../../connectors/file.connector';
import { StateWithForm } from '../../store/state';
import { Store, StoreModule } from '@ngrx/store';
import { reducerProvider, reducerToken } from '../../store/reducers';
import * as fromAction from '../../store/actions';

const blob1 = new Blob([''], { type: 'application/pdf' });
blob1['lastModifiedDate'] = '';
blob1['name'] = 'testFile1';
const mockFile = <File>blob1;

const mockBody = {
  code: '00007011',
  downloadUrl: '/medias/testFile1.pdf',
  mime: 'mockType',
};
const mockHttpResponse = {
  body: {
    code: '00007012',
    downloadUrl: '/medias/testFile1.pdf',
  },
};

class MockFileConnector {
  uploadFile() {
    return of();
  }
  getFile() {
    return of(mockBody);
  }
  getFiles() {
    return of(mockBody);
  }
}

class MockAuthService {
  getOccUserId(): Observable<string> {
    return of(OCC_USER_ID_CURRENT);
  }
}

describe('FileService', () => {
  let service: FileService;
  let mockOccFileFileConnector: MockFileConnector;
  let store: Store<StateWithForm>;

  beforeEach(() => {
    mockOccFileFileConnector = new MockFileConnector();
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('form', reducerToken),
      ],
      providers: [
        FileService,
        reducerProvider,
        {
          provide: FileConnector,
          useValue: mockOccFileFileConnector,
        },
        {
          provide: AuthService,
          useClass: MockAuthService,
        },
      ],
    });
    service = TestBed.inject(FileService);
    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should check if FileService is injected', inject(
    [FileService],
    (fileUploadService: FileService) => {
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

  it('should set file in store', () => {
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

  it('should be able to get files', () => {
    let result;
    service
      .getFiles(Array.from(mockBody.code))
      .subscribe(file => {
        result = file;
      })
      .unsubscribe();
    expect(result).toEqual(mockBody);
  });
  it('should be able to fetch file', () => {
    let result;
    service
      .getFile(mockBody.code, mockBody.mime)
      .subscribe(file => {
        result = file;
      })
      .unsubscribe();
    expect(result).toEqual(mockBody);
  });
});
