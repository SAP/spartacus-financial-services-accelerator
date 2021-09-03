import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { InboxService } from '../../core/inbox/facade/inbox.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { MessageNotificationComponent } from './message-notification.component';
import { ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';
import createSpy = jasmine.createSpy;
import { AuthService } from '@spartacus/core';
import { FSUser } from '../../occ/occ-models/occ.models';
import { UserProfileService } from '@spartacus/user/profile/core';

const mockUser: FSUser = {
  name: 'testUser',
};

const mockMessages = {
  sorts: [
    {
      code: 'asc',
    },
  ],
  pagination: {
    page: 1,
  },
  messages: [
    {
      uid: 'testMsg1',
      subject: 'testSubject1',
      readDate: '21-01-2019',
    },
    {
      uid: 'testMsg2',
      subject: 'testSubject2',
    },
  ],
};

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

class MockInboxService {
  unreadMessagesStateSource = new BehaviorSubject<boolean>(true);
  unreadMessagesState$ = this.unreadMessagesStateSource.asObservable();
  getMessages() {
    return of(mockMessages);
  }
}

class MockUserProfileService {
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
  let mockedUserProfileService: UserProfileService;

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
            provide: UserProfileService,
            useClass: MockUserProfileService,
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
    mockedUserProfileService = TestBed.inject(UserProfileService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return messages', done => {
    component.ngOnInit();
    component.messagesObject$.subscribe(data => {
      expect(data.messages.length).toEqual(2);
      done();
    });
  });
});
