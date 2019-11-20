import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNavigationComponent } from './form-navigation.component';

describe('FormNavigationComponent', () => {
  let component: FormNavigationComponent;
  let fixture: ComponentFixture<FormNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormNavigationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
