import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { InboxService } from '../../core/my-account/facade/inbox.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { MessageNotificationComponent } from './message-notification.component';
import { ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';
import createSpy = jasmine.createSpy;
import { AuthService, UserService } from '@spartacus/core';
import { FSUser } from '../../occ/occ-models/occ.models';

const mockUser: FSUser = {
  name: 'testUser',
};

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

class MockInboxService {
  unreadMessagesState = new BehaviorSubject<any>(true);
  getNumberOfUnreadMessages(): Observable<number> {
    return of(2);
  }
}

class MockUserService {
  get() {
    return of(mockUser);
  }
}

class MockAuthService {
  isUserLoggedIn(): Observable<boolean> {
    return of(true);
  }
}

describe('MessageNotificationComponent', () => {
  let component: MessageNotificationComponent;
  let fixture: ComponentFixture<MessageNotificationComponent>;
  let mockInboxService: InboxService;
  let mockUserService: UserService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MessageNotificationComponent, MockUrlPipe],
        providers: [
          {
            provide: InboxService,
            useClass: MockInboxService,
          },
          {
            provide: ChangeDetectorRef,
            useValue: { markForCheck: createSpy('detectChanges') },
          },
          {
            provide: UserService,
            useClass: MockUserService,
          },
          {
            provide: AuthService,
            useClass: MockAuthService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockInboxService = TestBed.inject(InboxService);
    mockUserService = TestBed.inject(UserService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
