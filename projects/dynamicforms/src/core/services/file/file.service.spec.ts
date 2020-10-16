import { inject, TestBed } from '@angular/core/testing';
import { AuthService, OCC_USER_ID_CURRENT } from '@spartacus/core';
import { FileService } from './file.service';
import { Observable, of } from 'rxjs';
import { FileConnector } from '../../connectors/file.connector';
import { StateWithForm } from '../../store/state';
import { Store, StoreModule } from '@ngrx/store';
import { reducerProvider, reducerToken } from '../../store/reducers';
import * as fromAction from '../../store/actions';

class MockFileConnector {
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

  it('should get status of file being uploaded', () => {
    service.setFileInStore(mockBody);
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.UploadFileSuccess({
        body: mockBody,
      })
    );
  });
});
