import { TestBed } from '@angular/core/testing';
import { OccUserAdapter } from '@spartacus/core';
import { OccFSUserAdapter } from '../../../occ/adapters/user/occ-user.adapter';
import { of } from 'rxjs';
import createSpy = jasmine.createSpy;
import { FSUserConnector } from '../../user/connectors/user-connector';
import { HttpClientTestingModule } from '@angular/common/http/testing';

class MockOccUserAdapter extends OccUserAdapter {
  remove = createSpy('remove').and.returnValue(of({}));
}

class MockOccFSUserAdapter extends OccFSUserAdapter {
  remove = createSpy('remove').and.returnValue(of({}));
}

describe('FSUserConnector', () => {
  let service: FSUserConnector;
  let userAdapter: OccUserAdapter;
  let adapter: OccFSUserAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: OccUserAdapter, useClass: MockOccUserAdapter },
        { provide: OccFSUserAdapter, useClass: MockOccFSUserAdapter },
      ],
    });

    service = TestBed.inject(FSUserConnector);
    userAdapter = TestBed.inject(OccUserAdapter);
    adapter = TestBed.inject(OccFSUserAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('remove should call adapter', () => {
    let result;
    service.remove('user-id').subscribe(res => (result = res));
    expect(result).toEqual({});
    expect(adapter.remove).toHaveBeenCalledWith('user-id');
  });
});
