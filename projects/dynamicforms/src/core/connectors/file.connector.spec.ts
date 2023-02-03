import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { FileAdapter } from './file.adapter';
import { FileConnector } from './file.connector';
import createSpy = jasmine.createSpy;

class MockFileAdapter implements FileAdapter {
  getFilesForCodes = createSpy('FileAdapter.getFilesForCodes').and.callFake(
    (userId, fileCodes) => of('getFilesForCodes' + userId + fileCodes)
  );
  getFileForCodeAndType = createSpy(
    'FileAdapter.getFileForCodeAndType'
  ).and.callFake((userId, fileCode, fileType) =>
    of('getFileForCodeAndType' + userId + fileCode + fileType)
  );
  getFilesForUser = createSpy('FileAdapter.getFilesForUser').and.callFake(
    userId => of('getFilesForUser' + userId)
  );
  uploadFile = createSpy('FileAdapter.uploadFile').and.callFake(
    (userId, file) => of('uploadFile' + userId + file)
  );
  removeFileForUserAndCode = createSpy(
    'FileAdapter.removeFileForUserAndCode'
  ).and.callFake((userId, fileCode) =>
    of('removeFileForUserAndCode' + userId + fileCode)
  );
}

const documentType = 'application/pdf';
const documentCode = 'DOC001';
const documentCodes = ['DOC001,DOC2'];
const user = 'user';
const document = new File([], 'file');

describe('FileConnector', () => {
  let fileConnector: FileConnector;
  let fileAdapter: FileAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: FileAdapter, useClass: MockFileAdapter }],
    });
    fileConnector = TestBed.inject(FileConnector);
    fileAdapter = TestBed.inject(FileAdapter);
  });

  it('should be created', () => {
    expect(fileConnector).toBeTruthy();
  });

  it('should call adapter for getFileForCodeAndType', () => {
    fileConnector.getFile(user, documentCode, documentType);
    expect(fileAdapter.getFileForCodeAndType).toHaveBeenCalledWith(
      user,
      documentCode,
      documentType
    );
  });

  it('should call adapter for getFilesForUser', () => {
    fileConnector.getFiles(user);
    expect(fileAdapter.getFilesForUser).toHaveBeenCalledWith(user, undefined);
  });

  it('should call adapter for getFilesForCodes', () => {
    fileConnector.getFiles(user, documentCodes);
    expect(fileAdapter.getFilesForUser).toHaveBeenCalledWith(
      user,
      documentCodes
    );
  });

  it('should call adapter for uploadFile', () => {
    fileConnector.uploadFile(user, document);
    expect(fileAdapter.uploadFile).toHaveBeenCalledWith(user, document);
  });

  it('should call adapter for removeFileForUserAndCode', () => {
    fileConnector.removeFile(user, documentCode);
    expect(fileAdapter.removeFileForUserAndCode).toHaveBeenCalledWith(
      user,
      documentCode
    );
  });
});
