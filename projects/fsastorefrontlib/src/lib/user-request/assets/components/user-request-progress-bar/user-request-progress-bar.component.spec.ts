import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRequestProgressBarComponent } from './user-request-progress-bar.component';

describe('UserRequestProgressBarComponent', () => {
  let component: UserRequestProgressBarComponent;
  let fixture: ComponentFixture<UserRequestProgressBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserRequestProgressBarComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRequestProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
