import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseCoverNavigationComponent } from './choose-cover-navigation.component';

describe('ChooseCoverNavigationComponent', () => {
  let component: ChooseCoverNavigationComponent;
  let fixture: ComponentFixture<ChooseCoverNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChooseCoverNavigationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseCoverNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
