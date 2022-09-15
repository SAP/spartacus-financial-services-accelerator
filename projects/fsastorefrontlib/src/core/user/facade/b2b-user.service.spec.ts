import { inject, TestBed } from '@angular/core/testing';
import { ActionsSubject, Store, StoreModule } from '@ngrx/store';
import { B2BUserRole, UserIdService } from '@spartacus/core';
import { StateWithOrganization } from '@spartacus/organization/administration/core';
import { BehaviorSubject } from 'rxjs';
import { FSB2BUserService } from './b2b-user.service';
import { FSUserRole } from '../../../occ';

const userId = 'current';
let takeUserId$: BehaviorSubject<string | never>;
class MockUserIdService implements Partial<UserIdService> {
  takeUserId = () => takeUserId$.asObservable();
}

describe('B2BUserService', () => {
  let service: FSB2BUserService;
  let userIdService: UserIdService;
  let store: Store<StateWithOrganization>;
  let actions$: ActionsSubject;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        FSB2BUserService,
        { provide: UserIdService, useClass: MockUserIdService },
      ],
    });

    store = TestBed.inject(Store);
    service = TestBed.inject(FSB2BUserService);
    userIdService = TestBed.inject(UserIdService);
    spyOn(store, 'dispatch').and.callThrough();
    spyOn(userIdService, 'takeUserId').and.callThrough();

    actions$ = TestBed.inject(ActionsSubject);
    takeUserId$ = new BehaviorSubject(userId);
  });

  it('should B2BUserService is injected', inject(
    [FSB2BUserService],
    (b2bUserService: FSB2BUserService) => {
      expect(b2bUserService).toBeTruthy();
    }
  ));

  it('should get possible roles for b2b customer', () => {
    const possibleB2BRoles: any = service.getAllRoles();
    expect(possibleB2BRoles.length).toEqual(3);
    expect(possibleB2BRoles).toEqual([
      B2BUserRole.CUSTOMER,
      B2BUserRole.ADMIN,
      FSUserRole.SELLER,
    ]);
  });
});
