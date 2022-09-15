import { TestBed } from '@angular/core/testing';
import { RoutingService } from '@spartacus/core';
import { CurrentUnitService } from '@spartacus/organization/administration/components';
import {
  B2BUserService,
  Budget,
  LoadStatus,
  OrganizationItemStatus,
} from '@spartacus/organization/administration/core';
import { Observable, of } from 'rxjs';
import { FSUserFormService } from './user-form.service';
import { FSUserItemService } from './user-item.service';

const mockItemStatus = of({ status: LoadStatus.SUCCESS, item: {} });

class MockRoutingService {
  go() {}
  getParams() {
    return of();
  }
}

class MockCurrentUnitService {}

class MockB2bUserService {
  get() {
    return of();
  }
  getLoadingStatus(): Observable<OrganizationItemStatus<Budget>> {
    return mockItemStatus;
  }
}

class MockFSUserFormService {}

describe('FSUserItemService', () => {
  let service: FSUserItemService;
  let userService: B2BUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FSUserItemService,
        { provide: CurrentUnitService, useClass: MockCurrentUnitService },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: B2BUserService, useClass: MockB2bUserService },
        { provide: FSUserFormService, useClass: MockFSUserFormService },
      ],
    });

    service = TestBed.inject(FSUserItemService);
    userService = TestBed.inject(B2BUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
