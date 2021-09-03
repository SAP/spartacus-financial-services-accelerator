import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import {
  OCC_USER_ID_ANONYMOUS,
  OCC_USER_ID_CURRENT,
  UserIdService,
} from '@spartacus/core';
import { StateWithMyAccount } from '../../my-account/store/my-account-state';
import * as fromReducers from '../../my-account/store/reducers';
import { InboxDataService } from './inbox-data.service';
import { BehaviorSubject, Observable } from 'rxjs';

const userId: Observable<string> = new BehaviorSubject<string>(
  OCC_USER_ID_ANONYMOUS
);

class MockUserIdService {
  getUserId(): Observable<string> {
    return userId;
  }
}
describe('InboxDataService', () => {
  let service: InboxDataService;
  let store: Store<StateWithMyAccount>;
  let userIdService: MockUserIdService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('assets', fromReducers.getReducers()),
      ],
      providers: [
        InboxDataService,
        {
          provide: UserIdService,
          useClass: MockUserIdService,
        },
      ],
    });
    service = TestBed.inject(InboxDataService);
    store = TestBed.inject(Store);
    userIdService = TestBed.inject(UserIdService);
  });

  describe('userId', () => {
    it('should return userId when user logged in', () => {
      (userId as BehaviorSubject<string>).next(OCC_USER_ID_CURRENT);
      expect(service.userId).toEqual(OCC_USER_ID_CURRENT);
    });
    it('should not return userId when customer is not logged in', () => {
      (userId as BehaviorSubject<string>).next(OCC_USER_ID_ANONYMOUS);
      expect(service.userId).toEqual(OCC_USER_ID_ANONYMOUS);
    });
    it('should return anonymous userId when userId is empty', () => {
      (userId as BehaviorSubject<string>).next('');
      expect(service.userId).toEqual(OCC_USER_ID_ANONYMOUS);
    });
  });
});
