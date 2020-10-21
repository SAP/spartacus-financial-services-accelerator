import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import * as fromActions from '../actions';
import * as fromUserReducers from './../../store/reducers/index';
import * as fromEffects from './file.effect';
import { OCC_USER_ID_CURRENT } from '@spartacus/core';
import { FileConnector } from '../../connectors/file.connector';

const mockFileCode = 'testFileCode';
const mockDownloadUrl = 'mockDownloadUrl';

const mockFile = {
  code: mockFileCode,
  downloadUrl: mockDownloadUrl,
};
class MockFileConnector {
  uploadFile() {
    return of(mockFile);
  }
  removeFile() {
    return of(mockFile.code);
  }
}

describe('File Effects', () => {
  let actions$: Observable<fromActions.FileAction>;
  let effects: fromEffects.FilesEffect;
  let mockFileConnector: FileConnector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('form', fromUserReducers.getReducers()),
      ],
      providers: [
        {
          provide: FileConnector,
          useClass: MockFileConnector,
        },

        fromEffects.FilesEffect,
        provideMockActions(() => actions$),
      ],
    });
    effects = TestBed.inject(fromEffects.FilesEffect);
    mockFileConnector = TestBed.inject(FileConnector);
  });

  describe('removeFile$', () => {
    it('should remove file by code', () => {
      const action = new fromActions.RemoveFile({
        user: OCC_USER_ID_CURRENT,
        fileCode: mockFileCode,
      });
      const completion = new fromActions.RemoveFileSuccess(mockFileCode);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.removeFile$).toBeObservable(expected);
    });
  });
  it('should fail to remove file by code', () => {
    spyOn(mockFileConnector, 'removeFile').and.returnValue(throwError('Error'));
    const action = new fromActions.RemoveFile({
      user: OCC_USER_ID_CURRENT,
      fileCode: mockFileCode,
    });
    const completion = new fromActions.RemoveFileFail(JSON.stringify('Error'));
    actions$ = hot('-a', { a: action });
    const expected = cold('-b', { b: completion });
    expect(effects.removeFile$).toBeObservable(expected);
  });
});
