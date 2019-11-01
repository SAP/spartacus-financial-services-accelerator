import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRequestSummaryComponent } from './user-request-summary.component';

describe('UserRequestSummaryComponent', () => {
  let component: UserRequestSummaryComponent;
  let fixture: ComponentFixture<UserRequestSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserRequestSummaryComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRequestSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
