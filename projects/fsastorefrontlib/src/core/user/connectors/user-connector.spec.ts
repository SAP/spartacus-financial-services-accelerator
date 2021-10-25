import { TestBed } from '@angular/core/testing';
import { OccFSUserAdapter } from '../../../occ/adapters/user/occ-user.adapter';
import { OccUserProfileAdapter } from '@spartacus/user/profile/occ';
import { of } from 'rxjs';
import createSpy = jasmine.createSpy;
import { FSUserConnector } from '../../user/connectors/user-connector';
import { HttpClientTestingModule } from '@angular/common/http/testing';

class MockOccUserProfileAdapter extends OccUserProfileAdapter {
  close = createSpy('close').and.returnValue(of({}));
}

class MockOccFSUserAdapter extends OccFSUserAdapter {
  remove = createSpy('remove').and.returnValue(of({}));
}

describe('FSUserConnector', () => {
  let service: FSUserConnector;
  let userAdapter: OccUserProfileAdapter;
  let adapter: OccFSUserAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: OccUserProfileAdapter, useClass: MockOccUserProfileAdapter },
        { provide: OccFSUserAdapter, useClass: MockOccFSUserAdapter },
      ],
    });

    service = TestBed.inject(FSUserConnector);
    userAdapter = TestBed.inject(OccUserProfileAdapter);
    adapter = TestBed.inject(OccFSUserAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('remove should call adapter', () => {
    spyOn(adapter, 'close').and.callThrough();
    service.remove('user-id');
    expect(adapter.close).toHaveBeenCalledWith('user-id');
  });
});
