import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalDetailsNavigationComponent } from './personal-details-navigation.component';

describe('PersonalDetailsNavigationComponent', () => {
  let component: PersonalDetailsNavigationComponent;
  let fixture: ComponentFixture<PersonalDetailsNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersonalDetailsNavigationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalDetailsNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
