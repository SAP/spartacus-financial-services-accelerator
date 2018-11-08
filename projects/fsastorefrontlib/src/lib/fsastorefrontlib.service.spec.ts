import { TestBed } from '@angular/core/testing';

import { FsastorefrontlibService } from './fsastorefrontlib.service';

describe('FsastorefrontlibService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FsastorefrontlibService = TestBed.get(FsastorefrontlibService);
    expect(service).toBeTruthy();
  });
});
