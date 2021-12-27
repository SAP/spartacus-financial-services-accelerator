import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService, I18nTestingModule } from '@spartacus/core';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { Observable, of } from 'rxjs';

import { FSUser, FSUserRole } from '../../occ/occ-models/occ.models';
import { DashboardLinkComponent } from './dashboard-link.component';

const mockSeller: FSUser = {
  firstName: 'Donna',
  lastName: 'Moore',
  roles: [FSUserRole.SELLER],
};

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

class MockUserAccountFacade {
  get() {
    return of(mockSeller);
  }
}

class MockAuthService {
  isUserLoggedIn(): Observable<boolean> {
    return of(true);
  }
}

describe('DashboardLinkComponent', () => {
  let component: DashboardLinkComponent;
  let fixture: ComponentFixture<DashboardLinkComponent>;
  let userAccountFacade: MockUserAccountFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [DashboardLinkComponent, MockUrlPipe],
      providers: [
        { provide: UserAccountFacade, useClass: MockUserAccountFacade },
        {
          provide: AuthService,
          useClass: MockAuthService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    userAccountFacade = TestBed.inject(UserAccountFacade);
    fixture = TestBed.createComponent(DashboardLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
