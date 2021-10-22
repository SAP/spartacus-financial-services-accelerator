import {
  Component,
  DebugElement,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockTranslatePipe, RoutingService, Title } from '@spartacus/core';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { of } from 'rxjs';
import { FSUser } from '../../../occ/occ-models';
import { FSUpdateProfileComponentService } from './update-profile-component.service';
import { FSUpdateProfileComponent } from './update-profile.component';
import { DateConfig } from './../../../core/date-config/date-config';
import { FormControl, FormGroup } from '@angular/forms';

const mockUser = {
  firstName: 'Donna',
  lastName: 'Moore',
  dateOfBirth: '10-10-1988',
  contactInfos: ['3333'],
};
const mockForm: FormGroup = new FormGroup({
  firstName: new FormControl(),
  lastName: new FormControl(),
  dateOfBirth: new FormControl(),
  contactInfos: new FormControl(),
});
const MockDateConfig: DateConfig = {
  date: {
    format: 'yyyy-mm-dd',
  },
};

@Component({
  selector: 'cx-fs-update-profile-form',
  template: ` <div>update profile form</div> `,
})
class MockUpdateProfileFormComponent {
  @Input()
  user: FSUser;

  @Input()
  titles: Title[];

  @Output()
  submitted = new EventEmitter<{ uid: string; userUpdates: FSUser }>();
}
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'cx-spinner',
  template: ` <div>spinner</div> `,
})
class MockCxSpinnerComponent {}

class MockFSUpdateProfileComponentService {
  patchForm() {}
  updateProfile() {}
}

class MockUserAccountFacade {
  get() {
    return of(mockUser);
  }
}
class MockRoutingService {
  go() {}
}

describe('FSUpdateProfileComponent', () => {
  let component: FSUpdateProfileComponent;
  let fixture: ComponentFixture<FSUpdateProfileComponent>;
  let el: DebugElement;

  let routingService: RoutingService;
  let fSUpdateProfileComponentService: FSUpdateProfileComponentService;
  let userAccountFacade: UserAccountFacade;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          FSUpdateProfileComponent,
          MockUpdateProfileFormComponent,
          MockCxSpinnerComponent,
          MockTranslatePipe,
        ],
        providers: [
          {
            provide: FSUpdateProfileComponentService,
            useClass: MockFSUpdateProfileComponentService,
          },
          {
            provide: UserAccountFacade,
            useClass: MockUserAccountFacade,
          },
          {
            provide: DateConfig,
            useValue: MockDateConfig,
          },
          {
            provide: RoutingService,
            useClass: MockRoutingService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FSUpdateProfileComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    routingService = TestBed.inject(RoutingService);
    fSUpdateProfileComponentService = TestBed.inject(
      FSUpdateProfileComponentService
    );
    userAccountFacade = TestBed.inject(UserAccountFacade);
    component.form = mockForm;
    fixture.detectChanges();
    spyOn(userAccountFacade, 'get').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to home when cancelled', () => {
    spyOn(routingService, 'go').and.stub();
    component.onCancel();
    expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'home' });
  });

  it('should call updatePersonalDetails on submit', () => {
    spyOn(fSUpdateProfileComponentService, 'updateProfile').and.callThrough();
    component.onSubmit();
    expect(fSUpdateProfileComponentService.updateProfile).toHaveBeenCalled();
  });
});
