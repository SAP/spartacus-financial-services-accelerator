import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRequestNavigationComponent } from './user-request-navigation.component';
import { I18nTestingModule } from '@spartacus/core';

describe('UserRequestNavigationComponent', () => {
  let component: UserRequestNavigationComponent;
  let fixture: ComponentFixture<UserRequestNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [UserRequestNavigationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRequestNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
